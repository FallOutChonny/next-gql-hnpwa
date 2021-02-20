import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import App from '@/components/App'
import A from '@/components/AnchorLink'
import { withApollo } from '@/apollo/client'
import { useUser } from '@/apollo/user'

function UserPage() {
  const { data } = useUser()

  return (
    <App title={`Profile: ${data.id}`} isFooterVisible={false}>
      <tr className="height-10" title={`Profile: ${data.id}`} />
      <tr>
        <td>
          <table>
            <tbody>
              <tr>
                <td valign="top">user:</td>
                <td>
                  <Link href={`/user?id=${data.id}`}>
                    <A>{data.id}</A>
                  </Link>
                </td>
              </tr>
              <tr>
                <td valign="top">created:</td>
                <td>
                  <Link
                    href={`/front?day=${data.createdYYYYMMDD}&birth=${data.id}`}>
                    <A className="text-dark">{data.createdEN}</A>
                  </Link>
                </td>
              </tr>
              <tr>
                <td valign="top">karma:</td>
                <td>{data.karma}</td>
              </tr>
              <tr>
                <td valign="top">about:</td>
                <td>
                  <About dangerouslySetInnerHTML={{ __html: data.about }} />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Link href={`/submitted?id=${data.id}`}>
                    <A className="text-underline text-dark">submissions</A>
                  </Link>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Link href={`/threads?id=${data.id}`}>
                    <A className="text-underline text-dark">comments</A>
                  </Link>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Link href={`/favorites?id=${data.id}`}>
                    <A className="text-underline text-dark">favorites</A>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </td>
      </tr>
    </App>
  )
}

const About = styled.span`
  pre {
    max-width: 900px;
    overflow: auto;
    padding: 2px;
  }
`

export default withApollo(UserPage)
