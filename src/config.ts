export const dev = process.env.NODE_ENV !== 'production'

export const APP_PORT = process.env.APP_PORT || 3000

export const HN_API_URL =
  process.env.HN_API_URL || 'https://hacker-news.firebaseio.com'

export const HN_ALGOLIA_API_URL = 'http://hn.algolia.com/api/v1'

export const HN_API_VERSION = process.env.HN_API_VERSION || '/v0'

export const POSTS_PER_PAGE = 30
