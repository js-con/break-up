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

const Radio: React.FC<{
  checked: boolean
}> = (props) => {
  const checked = React.useState(props.checked)
  return <input type="radio" checked={checked} onChange={() => handleChange} />
}

const Form: React.FC<{ question: Question }> = ({ question }) => {
  const { title, options } = { ...question }
  const list = options.map((option, index) => {
    return {
      text: option,
      key: index,
      checked: false,
    }
  })
  const onChange = (item: any) => {
    item.checked = true
  }
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {list.map((item) => (
        <div key={item.key}>
          <div>{item.text}</div>
          <Radio></Radio>
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
