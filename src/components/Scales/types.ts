// 量表类型：标准、序数、区间、比例
// type ScaleType = 'nominal' | 'ordinal' | 'interval' | 'ratio'

interface NominalScale {
  type: 'nominal'
  form: {
    title: string
    options: string[]
  }[]
}

interface OrdinalScale {
  type: 'ordinal'
  form: {
    title: string
    degrees: string[]
  }[]
}

export type ScaleForm = NominalScale | OrdinalScale

