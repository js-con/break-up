import * as React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 84px;
  height: 32px;
  color: black;
  border-radius: 8px;
`

export interface Question extends Record<string, unknown> {
  title: string
  options: string[]
}

export interface ScaleProps {
  scale: Question[]
}

const Form: React.FC<{ question: Question }> = ({ question }) => {
  const [title, setTitle] = React.useState('')
  const [list, setList] = React.useState<any[]>([])
  React.useEffect(() => {
    const { options, title } = { ...question }
    setList([...options.map((option, index) => ({ text: option, key: index, checked: false }))])
    setTitle(title)
  }, [question])
  const handleChange = (index: number) => {
    const newList = list.map((item, i) => {
      if (i === index) {
        item.checked = true
      } else {
        item.checked = false
      }
      return item
    })

    setList([...newList])
  }
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {list.map((item) => (
        <div key={item.key}>
          <div>{item.text}</div>
          <input type="radio" checked={item.checked} onChange={() => handleChange(item.key)} />
        </div>
      ))}
    </div>
  )
}

export default function Scale(props: ScaleProps) {
  const { scale } = { ...props }
  const [page, setPage] = React.useState(0)
  const [question, setQuestion] = React.useState(scale[page])
  function onNext() {
    if (page < scale.length - 1) {
      setPage(page + 1)
    }
  }
  function onPrev() {
    if (page >= 0) {
      setPage(page - 1)
    }
  }
  React.useEffect(() => {
    if (scale[page]) {
      setQuestion(scale[page])
    }
  }, [page])

  return (
    <div>
      <Form question={question} />
      <footer>
        <Button onClick={() => onPrev()}>上一题</Button>
        <Button onClick={() => onNext()}>下一题</Button>
      </footer>
    </div>
  )
}
