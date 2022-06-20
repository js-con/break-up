import * as React from 'react'
import { useLocation } from 'react-router-dom'
import type { NominalScale, OrdinalScale, ScaleForm } from '../components/Scales/types'

interface Props {
  ans: number[]
  opponentAns: number[]
  scale: ScaleForm
}

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

const Result: React.FC = () => {
  const location = useLocation()
  const { ans, opponentAns, scale } = location.state as Props || {}

  const [titles, setTitles] = React.useState<string[]>([])
  const [ansText, setAnsText] = React.useState<string[]>([])
  const [opponentAnsText, setOpponentAnsText] = React.useState<string[]>([])

  React.useEffect(() => {
    setTitles(scale.content.map(i => i.title))
    if (scale.type === 'nominal') {
      setAnsText(getNominalAnswers(scale, ans))
      setOpponentAnsText(getNominalAnswers(scale, opponentAns))
    }
    else if (scale.type === 'ordinal') {
      setAnsText(getOrdinalAnswers(scale, ans))
      setOpponentAnsText(getOrdinalAnswers(scale, opponentAns))
    }
  }, [])

  return (
    <ul>
      {
        ansText.map((ans, index) => (
          <li key={index}>
            <div>
              题目:{titles[index]}
            </div>
            <div>
              你的答案:{ans}
            </div>
            <div>
              伙伴的答案:{opponentAnsText[index]}
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default Result
