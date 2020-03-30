import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import A from 'components/anchor-link'

const UpvoteShape = styled.div`
  width: 10px;
  height: 10px;
  border: 0px;
  margin: 3px 2px 6px;
  background: url('/grayarrow.gif') no-repeat;
`

export default function Upvote({ id }: { id: number }) {
  return (
    <center>
      <Link href={`/vote?item=${id}`} prefetch={false}>
        <A id={`up_${id}`}>
          <UpvoteShape />
        </A>
      </Link>
    </center>
  )
}
