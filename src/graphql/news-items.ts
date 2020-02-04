import api from './hn-api'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export enum NewsItemsTypes {
  TOP = 'top',
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
  kids: number[]
  url: string
  score: number
  title: string
  parts: number[]
  descendants: number
}

export const newsItemsTypeDef = /* GraphQL */ `
  type NewsItems {
    by: String
    id: Int
    score: Int
    text: String
    time: Int
    type: String
    kids: [ID]
    title: String
    url: String
  }

  extend type Query {
    newsItems(type: String = "top"): [NewsItems]
  }
`

export const newsItemsResolver = {
  Query: {
    newsItems: async (_, { type }, __) => {
      const eventref = api.child(`${type}stories`)
      const snapshot = await eventref.once('value')
      const ids: number[] = await snapshot.val()

      return await Promise.all(
        ids.map(async id => {
          const eventref = api.child(`item/${id}`)
          const snapshot = await eventref.once('value')

          return snapshot.val()
        }),
      )
    },
  },
}

export const newsItemsQuery = gql`
  query listNewsItems($type: String) {
    newsItems(type: $type) {
      by
      id
      score
      text
      time
      type
      kids
      title
      url
    }
  }
`

export const useNewsItems = () => {
  const { data, ...others } = useQuery<{ newsItems: any[] }>(newsItemsQuery, {
    variables: { type: 'top' },
  })

  return { data, ...others }
}
