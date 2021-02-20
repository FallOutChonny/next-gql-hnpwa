import React from 'react'
import Link from 'next/link'
import App from '@components/App'
import NewsItems from '@components/NewsItems'
import A from '@components/AnchorLink'
import ReadMoreLink from '@components/ReadMoreLink'
import Spacer from '@components/Spacer'
import { Feed } from '@config/types'
import { withApollo } from '@/apollo/client'
import { useNewsItems } from '@/apollo/news-items'

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
