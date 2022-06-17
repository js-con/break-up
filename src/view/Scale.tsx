import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import { Home } from '@mui/icons-material'
import { useToasts } from '../components/Toast'
import type { ScaleForm } from '../components/Scales/types'
import Nominal from '../components/Scales/NominalScale'
import Ordinal from '../components/Scales/OrdinalScale'
import FloatComponent from '../components/FloatComponent'
import { AESdecrypt, AESencrypt } from '../shared/utils'

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
          <p>可以通过它查看你们每道题的差异</p>
          <div className="mt-[8px] p-[8px] break-words bg-dark-400 rounded-sm">{sharedLink}</div>
        </div>
        <footer className="text-center">
        <Button variant="contained" onClick={() => handleClick()}>点击复制</Button>
        </footer>
      </DialogContent>
    </Dialog>
  )
}

const Scale: React.FC = () => {
  const navigate = useNavigate()
  const [dialogVisible, setDialogVisible] = React.useState(false)

  const [sharedDialogVisible, setSharedDialogVisible] = React.useState(false)
  const [sharedLink, setSharedLink] = React.useState('')

  const location = useLocation()
  const { form } = location.state as { form: ScaleForm }

  const [pageNo, setPageNo] = React.useState(0)
  const [curPage, setCurPage] = React.useState<any>(form.content[pageNo])
  const [ans, setAns] = React.useState(new Array(form.content.length).fill(undefined))

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
  }, [form, curPage, pageNo, ans])

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
    const answer = encodeURIComponent(AESencrypt(ans.join(',')))
    const url = `${window.location.href}?answer=${answer}`
    setSharedLink(url)
    setSharedDialogVisible(true)
  }

  function goHome() {
    navigate('/', { replace: true })
  }

  return (
    <>
      <FloatComponent>
        <Fab color="primary" onClick={() => setDialogVisible(true)}>
          <Home />
        </Fab>
      </FloatComponent>

      <Dialog open={dialogVisible}>
        <DialogTitle>
          放弃答题?
        </DialogTitle>
        <DialogContent>
          答题结果不会被保存
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogVisible(false)}>取消</Button>
          <Button onClick={() => goHome()} color="error">确认</Button>
        </DialogActions>
      </Dialog>

      <SharedDialog visible={sharedDialogVisible} sharedLink={sharedLink}/>

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
