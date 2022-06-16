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

const Scale: React.FC = () => {
  const toast = useToasts()

  const navigate = useNavigate()
  const [dialogVisible, setDialogVisible] = React.useState(false)

  const location = useLocation()
  const { form } = location.state as { form: ScaleForm }

  const [pageNo, setPageNo] = React.useState(0)
  const [curPage, setCurPage] = React.useState<any>(form.content[pageNo])
  const [ans, setAns] = React.useState(new Array(form.content.length).fill(undefined))

  React.useLayoutEffect(() => {
    setCurPage(form.content[pageNo])
  }, [form, pageNo])

  function Content() {
    switch (form.type) {
      case 'nominal':
        return <Nominal content={curPage} checked={ans[pageNo]} handleChange={handleChange}/>
      case 'ordinal':
        return <Ordinal content={curPage} config={form.config} checked={ans[pageNo]} handleChange={handleChange}/>
    }
  }

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
    toast.success('success')
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
      <Dialog
        open={dialogVisible}
      >
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
      <Paper className="p-[16px] mx-[16px] flex flex-col justify-center items-center">
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
