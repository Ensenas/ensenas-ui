/* eslint-disable @next/next/no-img-element */
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '../../context/NavigationLearningContext'
import { HeaderContainer, Logo, LogoutButton, SearchButton, SearchInput } from './HomeHeader.styles'
import SearchResults from './SearchResult'

const HomeHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { setCurrentLevel, setCurrentUnit, setCurrentLesson, levels, units, lessons } =
    useNavigation()
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    setCurrentPage(pathname || '')
  }, [pathname])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredLessons = lessons!.filter((lesson) =>
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectLesson = (selectedLesson: any) => {
    let level, unit, lesson

    level =
      selectedLesson.title[0] == 'A'
        ? 'Nivel avanzado'
        : selectedLesson.title[0] == 'I'
          ? 'Nivel intermedio'
          : 'Nivel básico'
    unit = `Unidad ${selectedLesson.title.split('-')[1]}: ${selectedLesson.description.split(':')[0]}`
    lesson = selectedLesson.description

    setCurrentLesson(lessons!.find((e) => e.id == selectedLesson.id)!)
    setCurrentLevel(levels!.find((e) => e.description == level)!)
    setCurrentUnit(units!.find((e) => e.description == unit)!)

    setSearchTerm('')
    router.push(`/learning/levels/${level}/units/${unit}/lessons/${lesson}`)
  }

  const handleSignOut = () => {
    localStorage.removeItem('userProgress')
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentLevel')
    localStorage.removeItem('currentUnit')
    localStorage.removeItem('currentLesson')
    localStorage.removeItem('hasShownModal')
    signOut({ redirect: false })
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
