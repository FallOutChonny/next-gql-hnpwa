import React from 'react'
import Link from 'next/link'
import App from 'components/app'
import NewsItems from 'components/news-items'
import A from 'components/anchor-link'
import ReadMoreLink from 'components/read-more-link'
import Spacer from 'components/spacer'
import { Feed } from 'constants/types'
import { withApollo } from '../graphql/client'
import { useNewsItems } from '../graphql/news-items'

function ShowHNPage() {
  const { data, loading } = useNewsItems({ feed: Feed.SHOW })

  return (
    <App title="Show" loading={loading}>
      <Spacer height={16} />
      <tr>
        <td colSpan={2} />
        <td className="text--grey">
          Please read the{' '}
          <Link href={'/'}>
            <A className="text-underline text-dark">rules.</A>
          </Link>{' '}
          You can also browse the{' '}
          <Link href={'/'}>
            <A className="text-underline text-dark">newest</A>
          </Link>{' '}
          Show HNs.
        </td>
      </tr>
      <Spacer height={12} />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/show?p=${data.nextPage}`}
      />
    </App>
  )
}

export default withApollo(ShowHNPage)
