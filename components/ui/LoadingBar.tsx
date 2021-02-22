/**
 * No longer used
 */
import React from 'react'
import styled, { keyframes } from 'styled-components'

const barKeyframes = keyframes`
  0% {
    width: 0%;
  }

  80% {
    width: 100%;
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const StyledLoadingBar = styled.div<{ loading?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  &:before {
    content: ' ';
    left: 0;
    top: 0;
    position: absolute;
    animation: ${barKeyframes} 1.5s ease-out;
    height: 3px;
    background: ${p => p.theme.orange};
  }
`

type Props = {
  loading?: boolean
}

export default function LoadingBar(props: Props) {
  return <StyledLoadingBar {...props} />
}
