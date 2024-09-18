/* eslint-disable @next/next/no-img-element */
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { HeaderContainer, Logo, LogoutButton, SearchButton, SearchInput } from './HomeHeader.styles'
import axios from 'axios'
import { useNavigation } from '../../context/NavigationLearningContext'
import SearchResults from './SearchResult'

const HomeHeader: React.FC = () => {

  const [lessons, setLessons] = useState<any[]>([])
  const [allLessons, setAllLessons] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson } = useNavigation()
  
  useEffect(() => {
    const fetchLessons = async () => {
        try {
            const response = await axios.get('/ens-api/lessons')
            console.log('DATA', response.data)
            const lessonsList = response.data.map((lesson: any) => ({
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                order: lesson.order
            }))
            lessonsList.sort((a, b) => a.order < b.order)
            setAllLessons(lessonsList)
        } catch (error) {
            console.error('Error fetching lessons:', error)
        } finally {
            setIsLoading(false) // Termina la carga, incluso si hay error
        }
    }
    fetchLessons()
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const filteredLessons = allLessons.filter(lesson =>
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectLesson = (lesson: any) => {
    // Maneja la selección de la lección (puedes cambiar el estado o redirigir, etc.)
    console.log('Lección seleccionada:', lesson);
    setSearchTerm(''); // Opcional: limpiar el campo de búsqueda después de seleccionar
  }

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
      <LogoutButton onClick={handleSignOut}>Cerrar Sesión</LogoutButton>
    </HeaderContainer>
  )
}

export default HomeHeader
