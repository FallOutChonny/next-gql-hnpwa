import styled from 'styled-components'
import A from 'components/anchor-link'

const LinkTitle = styled(A)`
  color: #000000;

  &:hover {
    text-decoration: none;
  }

  &:visited {
    color: ${p => p.theme.grey};
  }
`

export default LinkTitle
