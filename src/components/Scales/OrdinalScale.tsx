import * as React from 'react'
import { FormControl, Slider } from '@mui/material'
import type { OrdinalScale } from './types'

type ScaleContentMember = OrdinalScale['content'][number]
type ScaleConfig = OrdinalScale['config']
interface Mark {
  value: number
  label?: string
}
const Ordinal: React.FC<{
  content: ScaleContentMember
  config: ScaleConfig
  checked: number
  handleChange: Function
}> = ({ content, config, checked, handleChange }) => {
  const [title, setTitle] = React.useState('')
  const [marks, setMarks] = React.useState<Mark[]>([])
  const [value, setValue] = React.useState(0)

  React.useLayoutEffect(() => {
    setTitle(content.title)
  }, [content])

  React.useLayoutEffect(() => {
    setValue(checked ?? config.defaultDegree - 1)
    setMarks(createMarks(config))
  }, [config])

  function createMarks(config: ScaleConfig) {
    return new Array(config.degree).fill({}).map((_, idx) => {
      if (idx === 0) {
        return {
          value: idx,
          label: config.leftText,
        }
      }
      if (idx === config.degree - 1) {
        return {
          value: idx,
          label: config.rightText,
        }
      }
      return {
        value: idx,
      }
    })
  }

  return (
    <FormControl className="w-[100%]">
      <div className="mb-[8px] p-[8px] w-[100%] text-[1rem] leading-normal">{title}</div>
      <Slider
        value={value}
        step={1}
        marks={marks}
        track={false}
        min={0}
        max={marks.length - 1}
        onChange={(_, val) => handleChange(val)}
      />
    </FormControl>
  )
}

export default React.memo(Ordinal)
