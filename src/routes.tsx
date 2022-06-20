import { Navigate } from 'react-router-dom'
import Home from './view/Home'
import Scale from './view/Scale'
import Result from './view/Result'

export default [
  {
    path: '/',
    element: <Navigate to="/home"/>,
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
