import * as React from 'react'
import type { OrdinalScale } from './types'

const Ordinal: React.FC<{ scale: OrdinalScale }> = ({ scale }) => {
  return (
    <div>
      {JSON.stringify(scale)}
    </div>
  )
}

export default Ordinal
