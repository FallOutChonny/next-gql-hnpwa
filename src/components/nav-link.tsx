import Link from 'next/link'
import { Segment } from 'components/layouts'

type Props = {
  href: string
  title: string
  segment?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function NavLink({
  href,
  title,
  segment = true,
  className,
  style,
}: Props) {
  return (
    <>
      <Link href={href}>
        <a className={className} style={style}>
          {title}
        </a>
      </Link>
      {segment && <Segment />}
    </>
  )
}
