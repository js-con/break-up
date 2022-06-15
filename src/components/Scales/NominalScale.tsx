import * as React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import type { NominalScale } from './types'

type ScaleContentMember = NominalScale['content'][number]

const Nominal: React.FC<{ content: ScaleContentMember }> = ({ content }) => {
  const [title, setTitle] = React.useState('')
  const [radios, setRadios] = React.useState<ReturnType<typeof createRadios>>([])

  React.useEffect(() => {
    setTitle(content.title)
    setRadios(createRadios(content.options))
  }, [content])

  function createRadios(options: ScaleContentMember['options']) {
    return options.map((text, key) => ({
      key,
      text,
      checked: false,
    }))
  }

  function handleChange(key: number) {
    const newRadios = radios.map((item) => {
      item.checked = false
      if (item.key === key)
        item.checked = true
      return item
    })
    setRadios(newRadios)
  }

  return (
      <FormControl>
        <div className="mb-[8px] p-[8px] text-[1.5rem] leading-normal">{title}</div>
        <RadioGroup>
        {
          radios.map(item => (
            <FormControlLabel
              key={item.key}
              control={
                <Radio checked={item.checked} onClick={() => handleChange(item.key)}/>
              }
              label={item.text}
            />
          ))
        }
        </RadioGroup>
      </FormControl>
  )
}

export default Nominal
