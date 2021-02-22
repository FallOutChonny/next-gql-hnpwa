import styled from 'styled-components'

const A = styled.a`
  color: ${p => p.theme.grey};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default A
