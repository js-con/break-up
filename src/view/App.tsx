import { Route, Routes } from 'react-router-dom'
import router from '../routes'

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-center overflow-auto">
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
