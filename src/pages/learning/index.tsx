/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../components/ProtectedRoute'
import LoadingSpinner from '../../components/Spinner/Spinner'
import { useNavigation } from '../../context/NavigationLearningContext'
import {
  LevelCard,
  Section,
  Title
} from '../../styles/Learning.styles'

interface MyLearningProps {
  setCurrentLevel: (levelId: number) => void;
}

const MyLearning: React.FC<MyLearningProps> = ({}) => {
  const [levels, setLevels] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson } = useNavigation()
  

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get('/ens-api/common/paths')
        const levelList = response.data.map((level: any) => ({
          id: level.id,
          title: level.title,
          description: level.description
        }))
        console.log(levelList)
        levelList.sort((a, b) => b.id - a.id)
        console.log(levelList)
        setLevels(levelList)
      } catch (error) {
        console.error('Error fetching levels:', error)
      } finally {
        setIsLoading(false) // Termina la carga, incluso si hay error
      }
    }
    fetchLevels()
  }, [])
  const handleLevelClick = (levelId: number) => {
    console.log('Learning', levelId)
    setCurrentLevel(levelId)// Actualiza el nivel actual
    router.push(`/learning/levels/${levelId}`)
    // Aquí no cambiamos la URL, solo actualizamos el estado de la página
  }
  
  return (
    <ProtectedRoute>
      <HomeLayout activePage='/learning/levels'>
        <Section>
          <Title>Niveles de Aprendizaje</Title>
          <div>
            {isLoading ? (
              <LoadingSpinner /> // Muestra el spinner mientras se está cargando
            ) : (
              levels.map(level => (
                <div key={level.id} onClick={() => handleLevelClick(level.id)}>
                  <LevelCard>
                    <h1>{level.title}</h1>
                    <h3>{level.description}</h3>
                  </LevelCard>
                </div>
              ))
            )}
          </div>
        </Section>
      </HomeLayout>
    </ProtectedRoute>
  )
}

export default MyLearning
