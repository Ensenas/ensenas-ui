// components/Layout.tsx
import { useRouter } from 'next/router'
import React from 'react'

import { ContentContainer, HomePageWrapper, NavIcon, NavItem,SidebarContainer, SidebarNav } from '../../styles/HomePage.styles'
import HomeHeader from '../HomeHeader/HomeHeader'

const navItems = [
  { label: 'Inicio', icon: '/icons/home-icon.png', href: '/home' },
  { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
  { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
  { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' },
  { label: 'Estadísticas', icon: '/icons/statistics-icon.png', href: '/statistics' }
]

const HomeLayout: React.FC<{ children: React.ReactNode, activePage: string}> 
    = ({ children, activePage }) => {
    const router = useRouter()
    const handleNavigation = (href: string) => {
        router.replace(href)
    }
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
                onClick={() => handleNavigation(item.href)}
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
          {children}
        </ContentContainer>
      </HomePageWrapper>
    </div>
  )
}

export default HomeLayout
