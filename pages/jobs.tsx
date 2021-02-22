import React from 'react'
import Link from 'next/link'
import { Layout, NewsItems } from '@components/common'
import { A, Spacer, ReadMoreLink } from '@components/ui'
import Feed from '@utils/feed'
import { useNewsItems } from '@api/news-items'
import { withApollo } from '@api/client'

function JobsPage() {
  const { data, loading } = useNewsItems({ feed: Feed.JOB })

  return (
    <Layout title="jobs" loading={loading}>
      <Spacer height={16} />
      <tr>
        <td />
        <td>
          <span>
            <img src="/s.gif" alt="Hacker News PWA App" width={14} height={1} />
          </span>
        </td>
        <td className="text--grey">
          These are jobs at YC startups. See more at{' '}
          <Link href={'/'}>
            <A className="text-underline text-dark">Work at a Startup</A>
          </Link>
        </td>
      </tr>
      <Spacer height={14} />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/jobs?p=${data.nextPage}`}
      />
    </Layout>
  )
}

export default withApollo(JobsPage)
