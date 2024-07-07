import React from 'react'
import {
    AppTitle,
    Container,
    LogoImage
} from './AppLogoTitleElements'
import LogoImgSrc from '../../../public/logo.png'

type Props = {}

const AppLogoTitle = (props: Props) => {
    return (
        <Container href="/">
            <AppTitle> Enseñas </AppTitle>
            <LogoImage
                src={LogoImgSrc}
                alt="logo"
            />
        </Container>
    )
}

export default AppLogoTitle