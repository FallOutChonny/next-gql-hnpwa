import React from 'react'
import Link from 'next/link'
import App from 'components/app'
import NewsItems from 'components/news-items'
import A from 'components/anchor-link'
import { Feed } from 'constants/types'
import { withApollo } from '../graphql/client'
import { useNewsItems } from '../graphql/news-items'

function JobsPage() {
  const { data, loading } = useNewsItems({ feed: Feed.JOB })

  return (
    <App title="jobs" loading={loading}>
      <tr className="height-16" />
      <tr>
        <td />
        <td>
          <span>
            <img src="/s.gif" alt="gap" width={14} height={1} />
          </span>
        </td>
        <td className="text--grey">
          These are jobs at YC startups. See more at{' '}
          <Link href={'/'}>
            <A className="text-underline text-dark">Work at a Startup</A>
          </Link>
        </td>
      </tr>
      <tr className="height-14" />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      {data.pageInfo.hasNextPage && (
        <>
          <tr className="height-10" />
          <tr>
            <td colSpan={2} />
            <td className="text-10pt text--grey">
              <Link href={`/jobs?p=${data.nextPage}`}>
                <A>More</A>
              </Link>
            </td>
          </tr>
        </>
      )}
    </App>
  )
}

export default withApollo(JobsPage)
