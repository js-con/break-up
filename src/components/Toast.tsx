import { Alert, Snackbar } from '@mui/material'
import * as React from 'react'

const toastType = ['error', 'success', 'info', 'warning'] as const
interface Toast {
  type: 'error' | 'success' | 'warning' | 'info'
  text: string
  open: boolean
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

const Snack: React.FC<Toast> = React.memo(
  (toast) => {
    return (
    <>
      {
        <Snackbar open={toast.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
          <Alert severity={toast.type}>{toast.text}</Alert>
        </Snackbar>
      }
    </>
    )
  },
)
Snack.displayName = 'Snack'
export default function ToastProvider({ children }: any) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  function hideToast(target: Toast) {
    const newToasts = toasts.map((toast) => {
      if (toast === target)
        toast.open = false
      return toast
    })
    setToasts([...newToasts])
  }

  const toastProvider = toastType.reduce((acc: any, cur) => {
    acc[cur] = function (text: string) {
      const newToast = { type: cur, text, open: true }
      setToasts([...toasts, newToast])
      setTimeout(() => {
        hideToast(newToast)
      }, 2000)
    }
    return acc
  }, {})

  return (
    <Ctx.Provider value={ toastProvider } >
      {
        toasts.map((toast, index) => (
            <Snack {...toast} key={index}/>
        ))
      }
      { children }
    </Ctx.Provider>
  )
}

export const useToasts = () => React.useContext<UseToast>(Ctx)
