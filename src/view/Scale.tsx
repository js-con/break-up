import * as React from 'react'
import { useLocation } from 'react-router-dom'

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
    <div>
      <div className="">{title}</div>
      {options.map((item, index) => (
        <div key={index} className="flex justify-center items-center">
          <span className="w-[10rem] text-left">{item.text}</span>
          <input type="radio" checked={item.checked} onChange={() => handleChange(index)} />
        </div>
      ))}
    </div>
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
      alert('请选择答案')
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
    const answer = initAnswer(forms)
    console.log(answer)
  }

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <Form question={forms[page]} handleChange={handleChange}/>
      <footer>
        <button onClick={() => onPrev()} disabled={page <= 0}>
          上一题
        </button>
        {page < forms.length - 1
          ? (
          <button onClick={() => onNext()}>下一题</button>
            )
          : (
          <button onClick={() => onSubmit()}>提交</button>
            )}
      </footer>
    </div>
  )
}
