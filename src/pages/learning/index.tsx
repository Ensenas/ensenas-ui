/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../components/ProtectedRoute'
import LoadingSpinner from '../../components/Spinner/Spinner'
import { Level, useNavigation } from '../../context/NavigationLearningContext'
import {
  LevelCard,
  Section,
  Title
} from '../../styles/Learning.styles'


const MyLearning: React.FC = ({}) => {
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
          levels, isLoading
  } = useNavigation()
  

  
  const handleLevelClick = (level: Level) => {
    setCurrentLevel(level)// Actualiza el nivel actual
    router.push(`/learning/levels/${level.description}`)
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
              levels?.map(level => (
                <div key={level.id} onClick={() => handleLevelClick(level)}>
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
