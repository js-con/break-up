import * as React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import Button from '@mui/material/Button'
import type { NominalScale } from './types'

const Nominal: React.FC<{ scale: NominalScale }> = ({ scale }) => {
  const [title, setTitle] = React.useState('')
  const [options, setOptions] = React.useState([])
  const [page, setPage] = React.useState(0)

  React.useEffect(() => {

  }, [scale])

  return (
    <div>
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
      </div>
  )
}

export default Nominal
