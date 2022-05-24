import { Alert, Snackbar } from '@mui/material'
import * as React from 'react'

interface Toast {
  type: 'error' | 'success' | 'warning' | 'info'
  text: string
}
interface UseToast {
  error: (text: string) => void
  warning: (text: string) => void
  success: (text: string) => void
  info: (text: string) => void
}

const Ctx = React.createContext<UseToast>({
  error: () => {},
  warning: () => {},
  success: () => {},
  info: () => {},
})

export default function ToastProvider({ children }: any) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  function showToast(toast: Toast) {
    setToasts([...toasts, toast])
  }

  const toastType = ['error', 'success', 'info', 'warning'] as const
  const toast = toastType.reduce((acc: any, cur) => {
    acc[cur] = function (text: string) {
      showToast({ type: cur, text })
    }
    return acc
  }, {})

  return (
    <Ctx.Provider value={ toast }>
      {
        toasts.map((toast, index) => (
          <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} key={index}>
            <Alert severity={toast.type}>{toast.text}</Alert>
          </Snackbar>
        ))
      }
      { children }
    </Ctx.Provider>
  )
}

export const useToasts = () => React.useContext<UseToast>(Ctx)
