export const newsItemsFragment = /* GraphQL */ `
  fragment NewsItemsFields on NewsItems {
    by
    id
    score
    text
    time
    title
    type
    url
    parent {
      id
      title
    }
  }
`

export const newsItemsConnectionFragment = /* GraphQL */ `
  fragment NewsItemsConnectionFields on NewsItemsConnection {
    edges {
      cursor
      node {
        ...NewsItemsFields
        kids {
          __typename
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      totalPageCount
    }
  }
`
