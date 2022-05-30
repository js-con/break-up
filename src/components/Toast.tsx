import { Alert, Snackbar } from '@mui/material'
import * as React from 'react'

const toastType = ['error', 'success', 'info', 'warning'] as const
interface Toast {
  type: 'error' | 'success' | 'warning' | 'info'
  text: string
  open: boolean
  id: number
}
type UseToast = {
  [K in (typeof toastType[number])]: (text: string) => void
}

const Ctx = React.createContext<UseToast>({
  error: () => {},
  warning: () => {},
  success: () => {},
  info: () => {},
})

export default function ToastProvider({ children }: any) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const toastsRef = React.useRef<Toast[]>([])
  
  React.useEffect(()=>{
    toastsRef.current = toasts
  },[toasts])

  function hideToast(target: Toast) {
    toastsRef.current.shift()
    // const newToasts = toastsRef.current.map((toast) => {
    //   if (target === toast)
    //     toast.open = false
    //   return toast
    // })
    console.log(toastsRef.current)
    setToasts([...toastsRef.current])
  }

  const toastProvider = toastType.reduce((acc: any, cur) => {
    acc[cur] = function (text: string) {
      const newToast = { type: cur, text, open: true,id: toastsRef.current.length} 
      setToasts([...toasts, newToast])
      setTimeout(() => {
        hideToast(newToast)
      }, 1000)
    }
    return acc
  }, {})

  return (
    <Ctx.Provider value={ toastProvider } >
      {
        toasts.map((toast, index) => (
        <Snackbar open={toast.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{top:`${toast.id*5}%`}} key={index} >
            <Alert severity={toast.type}>{toast.text}</Alert>
          </Snackbar>
        ))
      }
      { children }
    </Ctx.Provider>
  )
}

export const useToasts = () => React.useContext<UseToast>(Ctx)
