import * as React from 'react'
import { Slider } from '@mui/material'
import type { OrdinalScale } from './types'

type ScaleContentMember = OrdinalScale['content'][number]
type ScaleConfig = OrdinalScale['config']
interface Mark {
  value: number
  label?: string
}
interface Props {
  content: ScaleContentMember
  config: ScaleConfig
  checked: number
  handleChange: Function
}

function createMarks(config: ScaleConfig) {
  return config.degree.map((label, idx) => {
    return {
      label,
      value: idx,
    }
  })
}

const Ordinal: React.FC<Props> = ({ content, config, checked, handleChange }) => {
  const [title, setTitle] = React.useState('')
  const [marks, setMarks] = React.useState<Mark[]>([])
  const [value, setValue] = React.useState(0)

  React.useLayoutEffect(() => {
    setTitle(content.title)
  }, [content])

  React.useLayoutEffect(() => {
    // if not checked , set default value and pass it to handleChange(ans)
    if (checked) { setValue(checked) }
    else {
      setValue(config.defaultDegree - 1)
      handleChange(config.defaultDegree - 1)
    }
    setMarks(createMarks(config))
  }, [config])

  const onChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number)
    handleChange(newValue)
  }

  return (
    <div className="w-[100%]">
      <div className="mb-[8px] p-[8px] w-[100%] text-center text-[1rem] leading-normal">{title}</div>
      <Slider
        value={value}
        step={1}
        marks={marks}
        track={false}
        min={0}
        max={marks.length - 1}
        onChange={onChange}
      />
    </div>
  )
}

export default React.memo(Ordinal)
