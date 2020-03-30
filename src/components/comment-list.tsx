import React from 'react'
import { NewsItems } from 'constants/types'
import Comment from 'components/comment-with-footer'

type Props = {
  render?: (rows: JSX.Element[]) => JSX.Element
  data: NewsItems
}

export default function CommentList({ data, render }: Props) {
  const renderChild = (comment: NewsItems, lvl: number) => {
    rows.push(<Comment key={comment.id} data={comment} lvl={lvl} />)

    if (comment.kids && comment.kids.length > 0) {
      comment.kids.forEach(child => renderChild(child, lvl + 1))
    }
  }

  let rows: JSX.Element[] = []

  rows.push(<Comment key={data.id} data={data} />)

  if (data.kids) {
    data.kids.forEach(comment => renderChild(comment, 1))
  }

  // pass custom props into <Comment /> with render props
  return render ? render(rows) : <>{rows}</>
}
