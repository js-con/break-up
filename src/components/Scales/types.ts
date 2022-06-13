// 量表类型：标准、序数、区间、比例
// type ScaleType = 'nominal' | 'ordinal' | 'interval' | 'ratio'

export interface NominalScale {
  type: 'nominal'
  content: {
    title: string
    options: string[]
  }[]
}

export interface OrdinalScale {
  type: 'ordinal'
  content: {
    title: string
    degrees: string[]
  }[]
}

export type ScaleForm = NominalScale | OrdinalScale

