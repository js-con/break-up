import * as React from 'react'
import type { OrdinalScale } from './types'

type ScaleContentMember = OrdinalScale['content'][number]
const Ordinal: React.FC<{ content: ScaleContentMember }> = ({ content }) => {
  return (
    <div>
      {JSON.stringify(content)}
    </div>
  )
}

export default Ordinal
