import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spacer } from '@components/ui'

const shimmer = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`

const SkeletonBox = styled.li`
  list-style: none;
  height: 12px;
  margin-top: 3px;
  background: linear-gradient(90deg, #d6d6d6 25%, #e2e2e2 37%, #e3e3e3 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`

type Props = {
  list?: number
}

export default function Skeleton({ list = 3 }: Props) {
  return (
    <>
      <Spacer />
      <tr>
        <td colSpan={3} className="w-full">
          <div className="pl-10">
            {Array.from({ length: list }).map((_, idx) => (
              <div key={idx} className="mt-6">
                <SkeletonBox style={{ width: '90%' }}></SkeletonBox>
                <SkeletonBox style={{ width: '60%' }}></SkeletonBox>
              </div>
            ))}
          </div>
        </td>
      </tr>
    </>
  )
}
