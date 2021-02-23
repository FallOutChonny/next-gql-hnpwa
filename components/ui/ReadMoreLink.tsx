import React from 'react'
import Link from 'next/link'
import { A }  from '@components/ui'

type Props = {
  url: string
  visible?: boolean
  wrapperClassName?: string
  className?: string
  style?: React.CSSProperties
  space?: boolean
}

export default function ReadMoreLink({
  url,
  visible = false,
  space = true,
  wrapperClassName = '',
  className = '',
}: Props) {
  if (!visible) {
    return null
  }

  return (
    <>
      {space && <tr className="h-10" />}
      <tr>
        <td colSpan={2} />
        <td className={`text-10pt text-grey ${wrapperClassName}`}>
          <Link href={url}>
            <A className={className}>More</A>
          </Link>
        </td>
      </tr>
    </>
  )
}
