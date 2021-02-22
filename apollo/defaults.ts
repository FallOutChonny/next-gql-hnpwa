import type { QueryResult } from './types'

export const defaultQueryResult: QueryResult = {
  edges: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    totalPageCount: 0,
  },
}
