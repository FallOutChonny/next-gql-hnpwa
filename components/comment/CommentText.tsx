import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  a {
    color: #000;
  }

  p {
    margin-top: 8px;
    margin-bottom: 0;
  }
`

export default function CommentText({ html }: { html: string }) {
  return (
    <div css={{ maxWidth: 1215, overflow: 'hidden' }} className="mt-5 text-9pt">
      <Text
        className="text-dark text-9pt"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
