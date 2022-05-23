import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import questions from 'static/questions/test'
import Scale from './Scale'
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scale:question" element={<Scale />}></Route>
      </Routes>
  )
}

function Home() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-dark-300 text-white">
      <div className="text-center">
        <h1 className="text-[2.23rem]">欢迎使用break up!</h1>
        <h2 className="my-[20px] text-[1.5rem]">请选择问题集</h2>
        <ul>
          {questions.map((q, i) => (
            <li key={i} className="mt-[12px] p-[12px] bg-gray-400 text-black">
              <div>
                <p className="text-[1.5rem]">{q.name}</p>
                <p className="mt-[4px]">{q.introduction}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
