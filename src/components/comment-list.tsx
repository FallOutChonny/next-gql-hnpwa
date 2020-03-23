import React from 'react'
import { NewsItems } from 'constants/types'
import Comment from 'components/comment'

export default function CommentList({ data }: { data: NewsItems }) {
  let rows: JSX.Element[] = []

  const renderChild = (comment: NewsItems, lvl: number) => {
    rows.push(<Comment key={comment.id} data={comment} lvl={lvl} />)

    if (comment.kids && comment.kids.length > 0) {
      comment.kids.forEach(child => renderChild(child, lvl + 1))
    }
  }

  rows.push(<Comment key={data.id} data={data} />)

  if (data.kids) {
    data.kids.forEach(comment => renderChild(comment, 1))
  }

  return <>{rows}</>
}
