import { Route, Routes } from 'react-router-dom'
import router from '../routes'

function App() {
  return (
    <div className="w-screen h-[100%]">
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
