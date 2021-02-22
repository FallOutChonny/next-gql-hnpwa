import React from 'react'
import { Layout, NewsItems } from '@components/common'
import { CommentList } from '@components/comment'
import { useNewsItemsWithComments } from '@api/news-items'
import { withApollo } from '@api/client'

function NewsItemsPage() {
  const { data, loading } = useNewsItemsWithComments()

  return (
    <Layout title={data.title} loading={loading}>
      <tr className="height-10" title={data.title} />
      <tr>
        <td>
          <table id="fatitem">
            <tbody>
              <NewsItems data={data} isRankVisible={false} />
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
    </Layout>
  )
}

export default withApollo(NewsItemsPage)
