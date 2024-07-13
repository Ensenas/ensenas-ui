import React, { useState } from 'react'

import HomeHeader from '../components/HomeHeader/HomeHeader'
import { ContentContainer, HomePageWrapper,NavIcon, NavItem, SidebarContainer, SidebarNav } from '../styles/HomePage.styles'

const navItems = [
  { label: 'Inicio', icon: '/icons/home-icon.png', href: '/' },
  { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
  { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
  { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' }
]

const HomePage: React.FC = () => {
  const [activePage, setActivePage] = useState('/')

  return (
    <div>
      <HomeHeader />
      <HomePageWrapper>
        <SidebarContainer>
          <SidebarNav>
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                isActive={activePage === item.href}
                onClick={() => setActivePage(item.href)}
              >
                <NavIcon>
                  <img src={item.icon} alt={`${item.label} Icon`} />
                </NavIcon>
                <span>{item.label}</span>
              </NavItem>
            ))}
          </SidebarNav>
        </SidebarContainer>
        <ContentContainer>
          {activePage === '/' && <div>Inicio Content</div>}
          {activePage === '/learning' && <div>Mi Aprendizaje Content</div>}
          {activePage === '/profile' && <div>Perfil Content</div>}
          {activePage === '/achievements' && <div>Mis Logros Content</div>}
        </ContentContainer>
      </HomePageWrapper>
    </div>
  )
}

export default HomePage
