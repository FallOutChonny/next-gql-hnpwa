import React from 'react'
import NextLink from 'next/link'
import Divider from '@components/Divider'
import A from '@components/LinkTitle'

type Props = {
  href: string
  title: string | React.ReactNode
  segment?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Link({
  href,
  title,
  segment = true,
  className,
  style,
}: Props) {
  return (
    <>
      <NextLink href={href}>
        <A className={className} style={style}>
          {title}
        </A>
      </NextLink>
      {segment && <Divider />}
    </>
  )
}
