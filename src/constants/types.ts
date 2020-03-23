export enum Feed {
  TOP = 'top',
  ASK = 'ask',
  JOB = 'job',
  SHOW = 'show',
  NEWEST = 'new',
}

export type NewsItems = {
  id: number
  deleted: boolean
  type: string
  by: string
  time: number
  text: string
  dead: boolean
  parent: number
  poll: number
  kids: NewsItems[]
  url: string
  score: number
  title: string
  parts: number[]
  descendants: number
  rank: number
}

export type QueryResult<T = any> = {
  edges: {
    cursor: string
    node: T
  }[]
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    totalPageCount: number
  }
}

export type HNQueryResult<T = any> = {
  hits: T[]
  hitsPerPage: number
  page: number
  nbPages: number
  params: string
  query: string
}

export const nullQueryResult: QueryResult = {
  edges: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    totalPageCount: 0,
  },
}
