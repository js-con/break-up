import { Button, Paper } from '@mui/material'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import type { NominalScale, OrdinalScale, ScaleForm } from '../components/Scales/types'

interface Props {
  ans: number[]
  opponentAns: number[]
  scale: ScaleForm
}

type Results = {
  title: string
  ansText: string
  opponentAnsText: string
  distance: 'equal' | 'close' | 'far'
}[]

function getNominalAnswers(scale: NominalScale, ans: number[]) {
  const result = scale.content.map((item, idx) => {
    const resNo = ans[idx]
    item.options.forEach((option, no) => {
      if (no === resNo)
        return option
    })
    return ''
  })
  return result
}

function getOrdinalAnswers(scale: OrdinalScale, ans: number[]) {
  const result = ans.map((item) => {
    return scale.config.degree[item]
  })
  return result
}

function calcDistance(ans1: number, ans2: number, total: number): Results[number]['distance'] {
  if (ans1 === ans2)
    return 'equal'

  if (Math.abs(ans1 - ans2) < (total / 3))
    return 'close'

  return 'far'
}

const Result: React.FC = () => {
  const location = useLocation()
  const { ans, opponentAns, scale } = location.state as Props || {}

  const [results, setResults] = React.useState<Results>([])

  React.useEffect(() => {
    const titles = scale.content.map(i => i.title)
    let ansText: string[]
    let opponentAnsText: string[]
    if (scale.type === 'nominal') {
      ansText = getNominalAnswers(scale, ans)
      opponentAnsText = getNominalAnswers(scale, opponentAns)
      setResults(ans.map((ans, idx) => {
        return {
          title: titles[idx],
          ansText: ansText[idx],
          opponentAnsText: opponentAnsText[idx],
          distance: calcDistance(ans, opponentAns[idx], scale.content[idx].options.length),
        }
      }))
    }
    else if (scale.type === 'ordinal') {
      ansText = getOrdinalAnswers(scale, ans)
      opponentAnsText = getOrdinalAnswers(scale, opponentAns)
      setResults(ans.map((ans, idx) => {
        return {
          title: titles[idx],
          ansText: ansText[idx],
          opponentAnsText: opponentAnsText[idx],
          distance: calcDistance(ans, opponentAns[idx], scale.config.degree.length),
        }
      }))
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      {
        results.map((result, idx) => (
          <Paper key={idx} className="mb-[24px] p-[12px] w-[80%] min-h-[125px]">
            <div className="mb-[12px] w-[100%]">
              <Button
                color={
                  result.distance === 'equal'
                    ? 'success'
                    : result.distance === 'close'
                      ? 'warning'
                      : 'error'
                }
                variant="outlined"
                className="w-[100%]"
              >
                {result.title}
              </Button>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <Button variant="text" color="info" className="w-[48px]">我</Button>
                <Button className="flex-1" color="info">{result.ansText}</Button>
              </div>
              <div className="flex">
                <Button variant="text" color="primary" className="w-[48px]">TA</Button>
                <Button className="flex-1" color="primary">{result.opponentAnsText}</Button>
              </div>
            </div>
          </Paper>
        ))
      }
    </div>
  )
}

export default Result
