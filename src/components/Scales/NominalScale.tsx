import * as React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import type { NominalScale } from './types'

type ScaleContentMember = NominalScale['content'][number]

const Nominal: React.FC<{ content: ScaleContentMember }> = ({ content }) => {
  const [radios, setRadios] = React.useState<ReturnType<typeof createRadios>>([])

  React.useEffect(() => {
    setRadios(createRadios(content.options))
  }, [content])

  function createRadios(options: ScaleContentMember['options']) {
    return options.map((text, key) => ({
      key,
      text,
      checked: false,
    }))
  }

  return (
      <FormControl>
        <div className="mb-[8px] p-[8px] text-[1.5rem] leading-normal">{content.title}</div>
        <RadioGroup>
        {
          radios.map(item => (
            <FormControlLabel
              key={item.key}
              control={
                <Radio checked={item.checked} />
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
