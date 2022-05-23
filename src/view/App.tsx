import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import questions from 'static/questions/test'
import Scale from './Scale'
function App() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-dark-300 text-white text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scale" element={<Scale />}></Route>
      </Routes>
    </div>
  )
}

function Home() {
  return (
      <div>
        <h1 className="text-[2.23rem]">欢迎使用break up!</h1>
        <h2 className="my-[20px] text-[1.5rem]">请选择问题集</h2>
        <ul>
          {questions.map((q, i) => (
            <li key={i} className="mt-[12px] bg-gray-400 text-black">
                <Link
                  to="/scale"
                  state={{ question: q.questions }}
                  className="block p-[12px] no-underline text-black"
                >
                  <p className="text-[1.5rem]">{q.name}</p>
                  <p className="mt-[4px]">{q.introduction}</p>
                </Link>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default App
