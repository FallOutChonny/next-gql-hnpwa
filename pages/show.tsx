import React from 'react'
import Link from 'next/link'
import { Layout, NewsItems } from '@components/common'
import { A, Spacer, ReadMoreLink } from '@components/ui'
import Feed from '@utils/feed'
import { useNewsItems } from '@api/news-items'
import { withApollo } from '@api/client'

function ShowHNPage() {
  const { data, loading } = useNewsItems({ feed: Feed.SHOW })

  return (
    <Layout title="Show" loading={loading}>
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
    </Layout>
  )
}

export default withApollo(ShowHNPage)
