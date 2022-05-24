import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import App from './view/App'
import './style/index.css'
import 'virtual:windi.css'
import theme from './style/theme'
import ToastProvider from './components/Toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <BrowserRouter>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BrowserRouter>
      </React.StrictMode>,
    </ThemeProvider>,
)
