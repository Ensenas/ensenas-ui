
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
import LevelUnits from './learning/levels/[id]/index'
import UnitLessons from './learning/levels/[id]/units'
import Lesson from './learning/levels/[id]/units/lessons/index'
import Profile from './profile'
import Statistics from './statistics'

const navItems = [
  { label: 'Inicio', icon: '/icons/home-icon.png', href: '/home' },
  { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
  { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
  { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' },
  { label: 'Estadísticas', icon: '/icons/statistics-icon.png', href: '/statistics' }

]

const HomePage: React.FC = () => {
  const router = useRouter()

  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [currentUnit, setCurrentUnit] = useState<number | null>(null)
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [activePage, setActivePage] = useState('/home')

  useEffect(() => {
    if (activePage.startsWith('/learning') && currentLevel) {
      if (currentUnit) {
        setActivePage(`/learning/levels/${currentLevel}/units/${currentUnit}`)
      } else {
        setActivePage(`/learning/levels/${currentLevel}`)
      }
    }
  }), [activePage, currentLevel, currentUnit, currentLesson]


  const handleNavigation = (href: string) => {
    setActivePage(href)
    if (!activePage.startsWith('/learning)')) {
      setCurrentLevel(null) // Reset level when navigating away from learning
      setCurrentUnit(null)
      setCurrentLesson(null)
    }
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
            {activePage === '/statistics' && <Statistics />}
            {activePage.startsWith('/learning/levels/') && currentLevel && !currentUnit &&
              <LevelUnits currentLevel={currentLevel} setCurrentUnit={setCurrentUnit} />}
            {activePage.startsWith(`/learning/levels/${currentLevel}`) && currentUnit && !currentLesson &&
              <UnitLessons currentLevel={currentLevel} currentUnit={currentUnit} setCurrentLesson={setCurrentLesson} />}
            {activePage.startsWith(`/learning/levels/${currentLevel}`) && currentUnit && currentLesson &&
              <Lesson currentLevel={currentLevel} currentUnit={currentUnit} currentLesson={currentLesson} />}
          </ContentContainer>
        </HomePageWrapper>
      </div>
    </ProtectedRoute>
  )
}

export default HomePage
