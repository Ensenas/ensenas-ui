import React from 'react'

import { AppTitle, Container, LogoImage } from './AppLogoTitleElements'

// type Props = {}

const AppLogoTitle = () => {
  return (
    <Container href="/">
      <AppTitle> Enseñas </AppTitle>
      <LogoImage src="/logo.png" alt="logo" width={120} height={120} />
    </Container>
  )
}

export default AppLogoTitle
