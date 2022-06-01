import * as React from 'react'
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Alert, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Snackbar } from '@mui/material'
import { useToasts } from '../components/Toast'
import { AESencrypt } from '../shared/utils'

export interface Question extends Record<string, unknown> {
  title: string
  options: string[]
}

interface FormItem {
  title: string
  options: {
    text: string
    checked: boolean
  }[]
  key: number
}

const Form: React.FC<{ question: FormItem; handleChange: (i: number) => void }> = ({ question, handleChange }) => {
  const [title, setTitle] = React.useState('')
  const [options, setOptions] = React.useState<FormItem['options']>([])

  React.useEffect(() => {
    setOptions(question.options)
    setTitle(question.title)
  }, [question])

  return (
    <FormControl>
      <div className="mb-[8px] p-[8px] text-[1.5rem] leading-normal">{title}</div>
      <RadioGroup>
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Radio checked={item.checked} onChange={() => handleChange(index)} />
            }
            label={item.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

function initScale(questions: Question[]) {
  const scale = questions.map((item, index) => {
    return {
      title: item.title,
      options: item.options.map(i => ({ text: i, checked: false })),
      key: index,
    }
  })
  return scale
}

function initAnswer(scale: ReturnType<typeof initScale>) {
  const Answer = scale.map((question) => {
    return question.options.findIndex((option) => {
      return option.checked === true
    })
  })

  return Answer
}

export default function Scale() {
  const location = useLocation()
  const { question } = location.state as any
  const [forms, setForms] = React.useState(initScale(question))
  const [page, setPage] = React.useState(0)
  const toast = useToasts()

  React.useEffect(() => {
    const { question } = location.state as any
    setForms(initScale(question))
  }, [location])

  function onPrev() {
    if (page > 0)
      setPage(page - 1)
  }

  const handleChange = (index: number) => {
    const newForms = forms.map((item, idx) => {
      if (idx === page) {
        item.options.forEach((option, key) => {
          option.checked = key === index
        })
      }
      return item
    })
    setForms(newForms)
  }
  function validate() {
    if (forms[page].options.every(item => !item.checked)) {
      toast.error('请选择回答')
      return false
    }
    return true
  }

  function onNext() {
    if (!validate())
      return

    if (page < forms.length - 1)
      setPage(page + 1)
  }

  function onSubmit() {
    if (!validate())
      return
    const answer = AESencrypt(initAnswer(forms).join(''))  
    console.log(answer)
  }

  return (
    <>
      <Paper className="p-[16px] w-[80%] flex flex-col justify-center items-center">
        <Form question={forms[page]} handleChange={handleChange}/>
        <footer className="mt-[20px] w-[80%] flex justify-around">
          <Button
            onClick={() => onPrev()}
            disabled={page <= 0}
            variant="contained"
          >
            上一题
          </Button>
          {page < forms.length - 1
            ? (
            <Button onClick={() => onNext()} variant="contained">下一题</Button>
              )
            : (
            <Button onClick={() => onSubmit()} variant="contained">提交</Button>
              )}
        </footer>
      </Paper>
    </>

  )
}
