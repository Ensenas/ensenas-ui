import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
`

const FooterText = styled.p`
  font-size: 14px;
  color: #666;
`

const LandingFooter = () => {
  return (
    <FooterContainer>
      <FooterText>© {new Date().getFullYear()} Enseñas. Todos los derechos reservados.</FooterText>
    </FooterContainer>
  )
}

export default LandingFooter
