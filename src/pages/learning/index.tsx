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
  BackButton,
  Label,
  LevelCard,
  Section,
  Title
} from '../../styles/Learning.styles'


const MyLearning: React.FC = ({ }) => {
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
    levels, units, lessons, userProgress, isLoading
  } = useNavigation()



  const handleLevelClick = (level: Level) => {
    setCurrentLevel(level)// Actualiza el nivel actual
    router.push(`/learning/levels/${level.description}`)
    // Aquí no cambiamos la URL, solo actualizamos el estado de la página
  }

  const getLevelUnits = (level : Level) => {
    switch (level.id) {
      case 3:
          return units?.filter(unit => unit.title.startsWith('B'))
          break
      case 2:
          return units?.filter(unit => unit.title.startsWith('I'))
      
          break
      case 1:
          return units?.filter(unit => unit.title.startsWith('A'))
          break
  }
  }

  const getLevelStatus = (level: Level) => {
    // Filtrar las unidades que pertenecen al nivel
    const levelUnits = getLevelUnits(level)

    // Verificar el progreso de cada unidad en userProgress
    const allUnitsCompleted = levelUnits?.every(unit => {
        // Comprobar si todas las lecciones de la unidad están completadas
        const unitLessons = lessons?.filter(lesson => lesson.title.startsWith(unit.title))
        return unitLessons?.every(lesson => {
            const progress = userProgress?.find(progress => progress.challenge.id === lesson.id)
            return progress && progress.completed // Verifica si la lección está completada
        })
    })

    const anyUnitStarted = levelUnits?.some(unit => {
        // Comprobar si hay alguna lección de la unidad en progreso
        const unitLessons = lessons?.filter(lesson => lesson.title.startsWith(unit.title))
        return unitLessons?.some(lesson => {
            const progress = userProgress?.find(progress => progress.challenge.id === lesson.id)
            return progress && progress.started // Verifica si hay alguna lección en progreso
        })
    })

    // Devuelve el estado basado en el progreso de las unidades
    if (allUnitsCompleted) return 'Completado'
    if (anyUnitStarted) return 'En Progreso'
    return 'Pendiente'
}
  
  return (
    <ProtectedRoute>
      <HomeLayout activePage='/learning'>
        <Section>
          <Title>Niveles de Aprendizaje</Title>
          <div>
            {isLoading ? (
              <LoadingSpinner /> // Muestra el spinner mientras se está cargando
            ) : (
              levels?.map(level => (
                <div key={level.id} onClick={() => handleLevelClick(level)}>
                  <LevelCard style={{ position: 'relative' }}>
                    <Label status={getLevelStatus(level)}>{getLevelStatus(level)}</Label>
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
