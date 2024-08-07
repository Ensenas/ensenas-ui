/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

import {
  HeaderContainer,
  LoginButton,
  Logo,
  Nav,
  NavContainer,
  NavItem
} from './LandingHeader.styles'

const LandingHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <img src="/logo.png" alt="Enseñas Logo" />
        <span>Enseñas</span>
      </Logo>
      <NavContainer>
        <Nav>
          <NavItem>
            <Link href="#about" legacyBehavior>
              <a>¿Qué es Enseñas?</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="#how-it-works" legacyBehavior>
              <a>¿Cómo funciona?</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="#social-impact" legacyBehavior>
              <a>Impacto social</a>
            </Link>
          </NavItem>
        </Nav>
        <LoginButton>
          <Link href="/login" legacyBehavior>
            <a>Ingresar</a>
          </Link>
        </LoginButton>
      </NavContainer>
    </HeaderContainer>
  )
}

export default LandingHeader
