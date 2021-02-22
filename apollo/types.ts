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
