import { Home } from '@mui/icons-material'
import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FloatComponent from './FloatComponent'

interface Props {
  title: string
  content: string
}

const HomePager: React.FC<Props> = ({ title, content }) => {
  const [dialogVisible, setDialogVisible] = React.useState(false)
  const navigate = useNavigate()
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
          {title}
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogVisible(false)}>取消</Button>
          <Button onClick={() => goHome()} color="error">确认</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}

export default HomePager
