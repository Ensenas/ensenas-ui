'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'

import HomeHeader from '../HomeHeader/HomeHeader'
import { ContentContainer, HomePageWrapper, NavIcon, NavItem, SidebarContainer, SidebarNav } from './HomeLayout.styles'

interface NavItem {
  label: string
  icon: string
  href: string
}

export default function HomeLayout({ children, activePage }: { children: React.ReactNode, activePage: string }) {
  const router = useRouter()

  const [navItems, setNavItems] = useState<NavItem[]>([
    { label: 'Inicio', icon: '/icons/home-icon.png', href: '/home' },
    { label: 'Mi Aprendizaje', icon: '/icons/learning-icon.png', href: '/learning' },
    { label: 'Perfil', icon: '/icons/profile-icon.png', href: '/profile' },
    { label: 'Mis Logros', icon: '/icons/achievement-icon.png', href: '/achievements' },
    { label: 'Estadísticas', icon: '/icons/statistics-icon.png', href: '/statistics' },
    { label: 'Suscripciones', icon: '/icons/suscription-icon.png', href: '/suscriptions' },
    { label: 'Social Media', icon: '/icons/forum-icon.png', href: '/social' },
    { label: 'Contactanos', icon: '/icons/contact-icon.png', href: '/contact' }
  ])

  useEffect(() => {
    const isPremium = JSON.parse(localStorage.getItem('premium') || 'false')

    if (isPremium) {
      setNavItems(prevItems => [
        ...prevItems.slice(0, 2),
        { label: 'Modo Libre', icon: '/icons/freeMode-icon.png', href: '/freeMode' },
        ...prevItems.slice(2)
      ])
    }
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
