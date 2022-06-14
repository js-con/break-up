import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { Paper } from '@mui/material'
import type { ScaleForm } from './types'
import Nominal from './NominalScale'
import Ordinal from './OrdinalScale'

const Scale: React.FC = () => {
  const location = useLocation()
  const { form } = location.state as { form: ScaleForm }

  return (
    <>
      <Paper className="p-[16px] w-[80%] flex flex-col justify-center items-center">
        {
          form.type === 'nominal'
            ? <Nominal scale={form}/>
            : form.type === 'ordinal'
              ? <Ordinal scale={form}/>
              : ''
        }
      </Paper>
    </>
  )
}

export default Scale
