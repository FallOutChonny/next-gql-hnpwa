import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Layout } from '@components/common'
import { A } from '@components/ui'
import { useUser } from '@api/user'
import { withApollo } from '@api/client'

function UserPage() {
  const { data } = useUser()

  return (
    <Layout title={`Profile: ${data.id}`} isFooterVisible={false}>
      <tr className="h-10" title={`Profile: ${data.id}`} />
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
                    <A className="underline text-dark">submissions</A>
                  </Link>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Link href={`/threads?id=${data.id}`}>
                    <A className="underline text-dark">comments</A>
                  </Link>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Link href={`/favorites?id=${data.id}`}>
                    <A className="underline text-dark">favorites</A>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </td>
      </tr>
    </Layout>
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
