import Link from 'next/link'
import React from 'react'

import { HeaderContainer, Logo, LogoutButton, SearchButton, SearchInput } from './HomeHeader.styles'

const HomeHeader: React.FC = () => {
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
      <LogoutButton>
        <Link href="/" legacyBehavior>
          <a>Cerrar Sesión</a>
        </Link>
      </LogoutButton>
    </HeaderContainer>
  )
}

export default HomeHeader