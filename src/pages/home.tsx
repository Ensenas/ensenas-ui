import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'

import HomeHeader from '../components/HomeHeader/HomeHeader'
import { ContentContainer, HomePageWrapper, NavIcon, NavItem, SidebarContainer, SidebarNav } from '../styles/HomePage.styles'
import Achievements from './achievements'
import HomeMain from './homeMain'
import MyLearning from './learning'
import Profile from './profile'

const navItems = [
  { label: 'Inicio', icon: '/icons/home-icon.png', href: '/' },
  { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
  { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
  { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' }
]



const HomePage: React.FC = () => {
  const [activePage, setActivePage] = useState('/')
  const { data: session } = useSession()
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
          {activePage === '/' && <HomeMain />}
          {activePage === '/learning' && <MyLearning />}
          {activePage === '/profile' && <Profile />}
          {activePage === '/achievements' && <Achievements />}
        </ContentContainer>
      </HomePageWrapper>
    </div>
  )
}

export default HomePage
