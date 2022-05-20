import * as React from 'react'
import type { Question } from './Scale'
import Scale from './Scale'

function App() {
  const scale: Question[] = [
    {
      title: '测试问题1',
      options: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      title: '测试问题2',
      options: ['选项1', '选项2', '选项3', '选项4'],
    },
    {
      title: '测试问题3',
      options: ['选项1', '选项2', '选项3', '选项4'],
    },
  ]
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-dark-300">
      <Scale scale={scale} />
    </div>
  )
}

export default App
