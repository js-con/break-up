import * as React from 'react'
import type { ScaleForm } from '../components/Scales/types'

interface Props {
  ans: number[]
  opponentAns: number[]
  scale: ScaleForm
}

const Result: React.FC<Props> = ({ ans, opponentAns, scale }) => {
  return (
    <div></div>
  )
}

export default Result
