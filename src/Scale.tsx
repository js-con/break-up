import * as React from 'react'

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

const Form: React.FC<{ question: FormItem }> = ({ question }) => {
  const [title, setTitle] = React.useState('')
  const [options, setOptions] = React.useState<FormItem['options']>([])
  React.useEffect(() => {
    setOptions(question.options)
    setTitle(question.title)
  }, [question])
  const handleChange = (index: number) => {
    const newOptions = options.map((item, i) => {
      if (i === index) {
        item.checked = true
      } else {
        item.checked = false
      }
      return item
    })

    setOptions([...newOptions])
  }
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {options.map((item, index) => (
        <div key={index}>
          <span>{item.text}</span>
          <input type="radio" checked={item.checked} onChange={() => handleChange(index)} />
        </div>
      ))}
    </div>
  )
}

function initScale(scale: Question[]) {
  const list = scale.map((item, index) => {
    return {
      title: item.title,
      options: item.options.map((i) => ({ text: i, checked: false })),
      key: index,
    }
  })
  return list
}
export default function Scale(props: { scale: Question[] }) {
  const [forms, setForms] = React.useState<FormItem[]>(initScale(props.scale))
  const [page, setPage] = React.useState(0)
  const [question, setQuestion] = React.useState(forms[page])

  React.useEffect(() => {
    const { scale } = { ...props }
    setForms(initScale(scale))
  }, [props])

  React.useEffect(() => {
    if (forms[page]) {
      setQuestion(forms[page])
    }
  }, [page])

  function onPrev() {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  function validate() {
    if (question.options.every((item) => !item.checked)) {
      alert('请选择答案')
      return false
    }
    return true
  }

  function onNext() {
    if (!validate()) {
      return
    }
    if (page < forms.length - 1) {
      setPage(page + 1)
    }
  }

  function onSubmit() {
    if (!validate()) {
      return
    }
    alert('提交成功')
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form question={question} />
      <footer>
        <button onClick={() => onPrev()} disabled={page <= 0}>
          上一题
        </button>
        {page < forms.length - 1 ? (
          <button onClick={() => onNext()}>下一题</button>
        ) : (
          <button onClick={() => onSubmit()}>提交</button>
        )}
      </footer>
    </div>
  )
}
