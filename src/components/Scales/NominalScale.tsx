import * as React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import type { NominalScale } from './types'

type ScaleContentMember = NominalScale['content'][number]

const Nominal: React.FC<{ content: ScaleContentMember; checked: number; handleChange: Function }> = ({ content, checked, handleChange }) => {
  const [title, setTitle] = React.useState('')
  const [radios, setRadios] = React.useState<ReturnType<typeof createRadios>>([])

  React.useEffect(() => {
    setTitle(content.title)
    setRadios(createRadios(content.options))
  }, [content])

  function createRadios(options: ScaleContentMember['options']) {
    return options.map((text, key) => {
      return {
        key,
        text,
        checked: !!(checked !== undefined && checked === key),
      }
    })
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
