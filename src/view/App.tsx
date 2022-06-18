import { Route, Routes } from 'react-router-dom'
import router from '../routes'

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-center">
      <Routes>
      {
        router.map((r, i) => (
          <Route path={r.path} element={r.element} key={i}></Route>
        ))
      }
      </Routes>
    </div>
  )
}

export default App
