import React from 'react'
import App from '@components/App'
import NewsItemsIndex from '@components/NewsItems'
import CommentList from '@components/CommentList'
import { withApollo } from '@/apollo/client'
import { useNewsItemsWithComments } from '@/apollo/news-items'

function NewsItemsPage() {
  const { data, loading } = useNewsItemsWithComments()

  return (
    <App title={data.title} loading={loading}>
      <tr className="height-10" title={data.title} />
      <tr>
        <td>
          <table id="fatitem">
            <tbody>
              <NewsItemsIndex data={data} isRankVisible={false} />
              <tr className="height-3" />
              <tr>
                <td colSpan={2} />
                <td>
                  <form
                    method="POST"
                    action="comment"
                    className="m-block-end--1em">
                    <textarea
                      css={{ fontFamily: 'monospace' }}
                      className="text-10pt mb-16 d-block"
                      name="text"
                      cols={60}
                      rows={6}
                    />
                    <input type="submit" value="add comment" />
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <table id="comment-tree">
            <tbody>
              {data.kids.map(comment => (
                <CommentList key={comment.id} data={comment} />
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </td>
      </tr>
    </App>
  )
}

export default withApollo(NewsItemsPage)
