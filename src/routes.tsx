import { Navigate } from 'react-router-dom'
import { Home } from '@mui/icons-material'
import Scale from './view/Scale'
import Result from './view/Result'

export default [
  {
    path: '/',
    element: <Navigate to="/scale"/>,
  },
  {
    path: '/scale',
    element: <Scale />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/result',
    element: <Result />,
  },
]
