/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '../../context/NavigationLearningContext'
import { HeaderContainer, Logo, LogoutButton, SearchButton, SearchInput } from './HomeHeader.styles'
import SearchResults from './SearchResult'

const HomeHeader: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, 
    setCurrentLesson, levels, units, lessons } = useNavigation()
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState<string>('')
  const router = useRouter()

  const getFirstPartString = (string: string): string | undefined => {
    return string.split(':')[0]?.trim().toLowerCase()

  }

  const getSecondPartString = (string: string): string | undefined => {
    return string.split(':')[1]?.trim().toLowerCase()
  }

  useEffect(() => {
    setCurrentPage(pathname || '')
  }, [pathname])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredLessons = lessons!.filter(lesson =>
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectLesson = (selectedLesson: any) => {
    let level, unit, lesson

    level = selectedLesson.title[0] == 'A' ? 'Nivel avanzado' : selectedLesson.title[0] == 'I' ? 
      'Nivel intermedio' : 'Nivel básico'
    unit = `Unidad ${selectedLesson.title.split('-')[1]}: ${selectedLesson.description.split(':')[0]}`
    lesson = selectedLesson.description


    setCurrentLesson(lessons!.find(e => e.id == selectedLesson.id)!)
    setCurrentLevel(levels!.find(e => e.description == level)!)
    setCurrentUnit(units!.find(e => e.description == unit)!)

    setSearchTerm('')
    router.push(`/learning/levels/${level}/units/${unit}/lessons/${lesson}`)
  }

  // const determineLevel :  (number | null) = (lesson : any) => {
  //   return 0;
  // }

  // const determineUnit :  (number | null) = (lesson : any) => {
  //   return 0;
  // }

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentLevel')
    localStorage.removeItem('currentUnit')
    localStorage.removeItem('currentLesson')
    localStorage.removeItem('hasShownModal')
    signOut({ callbackUrl: '/' })
  }

  return (
    <HeaderContainer>
      <Logo>
        <img src="/logo.png" alt="Enseñas Logo" />
        <span>Enseñas</span>
      </Logo>
      {(currentPage == '/home' || currentPage == '/learning') && (
        <SearchInput>
          <SearchButton>
            <img src="/search-icon.png" alt="Buscar" />
          </SearchButton>
          <input
            type="text"
            placeholder="Buscar lección"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && filteredLessons.length > 0 && (
            <SearchResults lessons={filteredLessons} onSelect={handleSelectLesson} />
          )}
        </SearchInput>
      )}

      <LogoutButton onClick={handleSignOut}>Cerrar Sesión</LogoutButton>
    </HeaderContainer>
  )
}

export default HomeHeader
