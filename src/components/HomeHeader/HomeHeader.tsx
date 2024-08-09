/* eslint-disable @next/next/no-img-element */
import { signOut } from 'next-auth/react'
import React from 'react'

import { HeaderContainer, Logo, LogoutButton, SearchButton, SearchInput } from './HomeHeader.styles'

const HomeHeader: React.FC = () => {
  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    signOut({ callbackUrl: '/' })
  }

  return (
    <HeaderContainer>
      <Logo>
        <img src="/logo.png" alt="Enseñas Logo" />
        <span>Enseñas</span>
      </Logo>
      <SearchInput>
        <SearchButton>
          <img src="/search-icon.png" alt="Buscar" />
        </SearchButton>
        <input type="text" placeholder="Buscar lección" />
      </SearchInput>
      <LogoutButton onClick={handleSignOut}>Cerrar Sesión</LogoutButton>
    </HeaderContainer>
  )
}

export default HomeHeader
