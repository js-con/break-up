import { Button, ButtonGroup, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import * as React from 'react'

export interface Question extends Record<string, unknown> {
  title: string
  options: string[]
}

export interface ScaleProps {
  scale: Question[]
}

export default function Scale(props: ScaleProps) {
  const { scale } = props
  const [page, setPage] = React.useState(0)
  const [question, setQuestion] = React.useState(scale[page])
  function onNext() {
    if (page < scale.length - 1) {
      console.log(1)
      setPage(page + 1)
    }
  }
  function onPrev() {
    if (page >= 0) {
      console.log(1)
      setPage(page - 1)
    }
  }
  React.useEffect(() => {
    if (scale[page]) {
      console.log('todo')
      setQuestion(scale[page])
    }
  }, [page])

  return (
    <div>
      <Form title={question.title} options={question.options} />
      <footer>
        <ButtonGroup color="secondary" aria-label="medium secondary button group">
          <Button onClick={() => onPrev()}>上一题</Button>
          <Button onClick={() => onNext()}>下一题</Button>
        </ButtonGroup>
      </footer>
    </div>
  )
}

function Form(props: Question) {
  const { title, options } = props
  return (
    <div className="card">
      <FormLabel className="card-title">{title}</FormLabel>
      <RadioGroup className="card-options">
        {options.map((option, key) => (
          <FormControlLabel
            value={key}
            control={<Radio />}
            label={option}
            key={key}
          ></FormControlLabel>
        ))}
      </RadioGroup>
    </div>
  )
}
