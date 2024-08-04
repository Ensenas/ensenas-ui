import React from 'react'

import LogoImgSrc from '../../../public/logo.png'
import { AppTitle, Container, LogoImage } from './AppLogoTitleElements'

// type Props = {}

const AppLogoTitle = () => {
  return (
    <Container href="/">
      <AppTitle> Enseñas </AppTitle>
      <LogoImage src={LogoImgSrc} alt="logo" />
    </Container>
  )
}

export default AppLogoTitle
