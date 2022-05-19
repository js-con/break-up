import * as React from 'react'
import styled from 'styled-components'
import type { Question } from './Scale'
import Scale from './Scale'

const Root = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`

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
    <Root>
      <Scale scale={scale} />
    </Root>
  )
}

export default App
