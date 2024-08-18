
/* eslint-disable @next/next/no-img-element */
/*
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeHeader from '../components/HomeHeader/HomeHeader'
import ProtectedRoute from '../components/ProtectedRoute'
import {
  ContentContainer,
  HomePageWrapper,
  NavIcon,
  NavItem,
  SidebarContainer,
  SidebarNav
} from '../styles/HomePage.styles'
import Achievements from './achievements'
import HomeMain from './homeMain'
import MyLearning from './learning'
import Profile from './profile'
import LevelUnits from './units'
import UnitLessons from './lesson'

const navItems = [
  { label: 'Inicio', icon: '/icons/home-icon.png', href: '/' },
  { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
  { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
  { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' }
]

const HomePage: React.FC = () => {
  const [activePage, setActivePage] = useState('/')

  return (
    <ProtectedRoute>
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
            {activePage === '/units' && <LevelUnits />}
            {activePage === '/lessons' && <UnitLessons />}
          </ContentContainer>
        </HomePageWrapper>
      </div>
    </ProtectedRoute>
  )
}

export default HomePage

*/
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeHeader from '../components/HomeHeader/HomeHeader'
import ProtectedRoute from '../components/ProtectedRoute'
import {
  ContentContainer,
  HomePageWrapper,
  NavIcon,
  NavItem,
  SidebarContainer,
  SidebarNav
} from '../styles/HomePage.styles'
import Achievements from './achievements'
import HomeMain from './homeMain'
import MyLearning from './learning'
import Profile from './profile'
import LevelUnits from './learning/levels/[id]/index'
import UnitLessons from './learning/levels/[id]/units/[unitId]'

const navItems = [
  { label: 'Inicio', icon: '/icons/home-icon.png', href: '/home' },
  { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
  { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
  { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' }
]

const HomePage: React.FC = () => {
  const router = useRouter()

  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [currentUnit, setCurrentUnit] = useState<number | null>(null)
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [activePage, setActivePage] = useState('/home')

  useEffect(() => {

    console.log('home', currentLevel)
    console.log('home', currentUnit)
    if (activePage.startsWith('/learning') && currentLevel) {
      if (currentUnit)
        setActivePage(`/learning/levels/${currentLevel}/units/${currentUnit}`)
      setActivePage(`/learning/levels/${currentLevel}`)
    }
  }), [currentLevel, currentUnit]


  const handleNavigation = (href: string) => {
    setActivePage(href)
    setCurrentLevel(null) // Reset level when navigating away from learning
    setCurrentUnit(null)
  }

  return (
    <ProtectedRoute>
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
            {activePage === '/home' && <HomeMain />}
            {activePage === '/learning' && <MyLearning setCurrentLevel={setCurrentLevel} />}
            {activePage === '/profile' && <Profile />}
            {activePage === '/achievements' && <Achievements />}
            {activePage.startsWith('/learning/levels/') && currentLevel && !currentUnit && <LevelUnits currentLevel={currentLevel} setCurrentUnit={setCurrentUnit} />}
            {activePage.startsWith(`/learning/levels/${currentLevel}/units/`) && currentUnit && <UnitLessons levelId={currentLevel} unitId={currentUnit} />}
          </ContentContainer>
        </HomePageWrapper>
      </div>
    </ProtectedRoute>
  )
}

export default HomePage
