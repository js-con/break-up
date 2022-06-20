import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import { breakUp } from 'static/scales/breakUp'
import { useToasts } from '../components/Toast'
import type { ScaleForm } from '../components/Scales/types'
import Nominal from '../components/Scales/NominalScale'
import Ordinal from '../components/Scales/OrdinalScale'
import { AESdecrypt, AESencrypt } from '../shared/utils'
import HomePager from '../components/HomePager'

const SharedDialog: React.FC<{ visible: boolean; sharedLink: string }> = ({ visible, sharedLink }) => {
  const toast = useToasts()
  const handleClick = () => {
    navigator.clipboard.writeText(sharedLink)
    toast.success('链接已复制')
  }
  return (
    <Dialog open={visible} className="w-[100%]">
      <DialogTitle>
        分享
      </DialogTitle>
      <DialogContent>
        <div className="mb-[16px]">
          <p>复制链接然后发送给好友</p>
          <p>好友答完题后会生成一个比对结果页</p>
          <p>可以通过它查看你们每道题答案的差异</p>
          <div className="mt-[8px] p-[8px] break-words bg-dark-400 rounded-sm">{sharedLink}</div>
        </div>
        <footer className="text-center">
        <Button variant="contained" onClick={() => handleClick()}>点击复制</Button>
        </footer>
      </DialogContent>
    </Dialog>
  )
}

const InviteDialog: React.FC<{ visible: boolean; handleClose: Function }> = ({ visible, handleClose }) => {
  return (
    <Dialog open={visible} className="w-[100%]">
      <DialogTitle>
        分享
      </DialogTitle>
      <DialogContent>
        <div>
          <p>好友邀请你来完成这套三观测试题</p>
          <p>答题完成后,可以查看你和好友答案的对比</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>开始答题</Button>
      </DialogActions>
    </Dialog>
  )
}

const Scale: React.FC = () => {
  const [inviteDialogVisible, setInviteDialogVisible] = React.useState(false)
  const [sharedDialogVisible, setSharedDialogVisible] = React.useState(false)
  const [sharedLink, setSharedLink] = React.useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const [opponentAns, setOpponentAns] = React.useState<number[] | null>(null)
  const { form = breakUp } = location.state as { form: ScaleForm } || {}

  const [pageNo, setPageNo] = React.useState(0)
  const [curPage, setCurPage] = React.useState<any>(form.content[pageNo])
  const [ans, setAns] = React.useState(new Array(form.content.length).fill(undefined))

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const answer = params.get('answer')
    if (answer) {
      setOpponentAns(AESdecrypt(answer).split(',').map(item => Number(item)))
      setInviteDialogVisible(true)
    }
  }, [])

  React.useLayoutEffect(() => {
    setCurPage(form.content[pageNo])
  }, [form, pageNo])

  const Content = React.useCallback(() => {
    switch (form.type) {
      case 'nominal':
        return <Nominal content={curPage} checked={ans[pageNo]} handleChange={handleChange}/>
      case 'ordinal':
        return <Ordinal content={curPage} config={form.config} checked={ans[pageNo]} handleChange={handleChange}/>
    }
  }, [form, curPage, pageNo])

  function handleChange(key: number) {
    const newAns = ans.map((item, index) => {
      if (index === pageNo)
        item = key
      return item
    })
    setAns(newAns)
  }

  function onPrev() {
    setPageNo(pageNo - 1)
  }

  function onNext() {
    setPageNo(pageNo + 1)
  }

  function onSubmit() {
    if (opponentAns) {
      navigate('/result', {
        state: {
          scale: form,
          ans,
          opponentAns,
        },
      })
      return
    }
    const answer = encodeURIComponent(AESencrypt(ans.join(',')))
    const url = `${window.location.href}?answer=${answer}`
    setSharedLink(url)
    setSharedDialogVisible(true)
  }

  return (
    <>
      <HomePager title="放弃答题？" content="答题结果不会被保存"/>

      <SharedDialog visible={sharedDialogVisible} sharedLink={sharedLink}/>

      <InviteDialog visible={inviteDialogVisible} handleClose={() => setInviteDialogVisible(false)}/>

      <Paper className="p-[16px] w-[86%] flex flex-col justify-center items-center">
         <Content />
        <footer className="mt-[20px] w-[80%] flex justify-around">
          <Button
            onClick={() => onPrev()}
            disabled={pageNo <= 0}
            variant="contained"
          >
            上一题
          </Button>
          {pageNo < form.content.length - 1
            ? (
            <Button onClick={() => onNext()} variant="contained">下一题</Button>
              )
            : (
            <Button onClick={() => onSubmit()} variant="contained">提交</Button>
              )}
        </footer>
      </Paper>
    </>
  )
}

export default Scale
