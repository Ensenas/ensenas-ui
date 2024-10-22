/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
import { Lesson, useNavigation } from '../context/NavigationLearningContext'
import {
  AchievementCard,
  AchievementsGrid,
  CardContent,
  CardLesson,
  CardUnit,
  Medal,
  Section,
  Title
} from '../styles/Achievements.styles'

// Componente principal
const MisLogros: React.FC = () => {
  const router = useRouter()
  const [achievements, setAchievements] = useState<Lesson[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { lessons, userProgress } = useNavigation()


  useEffect(() => {
    const lessonList = lessons?.sort((a, b) => {
      const firstLetterA = a.title.charAt(0).toUpperCase()
      const firstLetterB = b.title.charAt(0).toUpperCase()
      
      const order = ['B', 'I', 'A']
      const indexA = order.indexOf(firstLetterA)
      const indexB = order.indexOf(firstLetterB)

      return indexA - indexB // Ordena según el índice
    }) || []

    // Filtrar lecciones y asociar progreso
    const achievementsWithProgress = lessonList.map((lesson) => {
      const progress = userProgress?.find((progress) => progress.challenge.id === lesson.id)
      return {
        ...lesson,
        completed: progress?.completed || false // Asigna el estado de completado
      }
    })

    setAchievements(achievementsWithProgress)
    setLoading(false) // Termina la carga después de obtener los logros
  }, [lessons, userProgress])

  const getFirstPartString = (string: string): string | undefined => {
    return string.split(':')[0]?.trim()
  }
  
  const getSecondPartString = (string: string): string | undefined => {
    return string.split(':')[1]?.trim()
  }

  return (
    <ProtectedRoute>
      <HomeLayout activePage='/achievements'>
        <div>
          {loading ? (
              <LoadingSpinner /> // Muestra el spinner mientras se está cargando
            ) : (
          <Section>
          <Title>Mis Logros</Title>
          <AchievementsGrid>
            {achievements.length === 0 ? (
              <CardContent>No hay logros para mostrar.</CardContent>
            ) : (
              achievements.map((achievement) => (
                <AchievementCard key={achievement.id}>
                  <CardUnit>
                    {getFirstPartString(achievement.description)}
                  </CardUnit>
                  <CardLesson>
                  {getSecondPartString(achievement.description)}
                  </CardLesson>
                  <Medal completed={achievement.completed} />
                  <CardContent>{achievement.title}</CardContent>
                </AchievementCard>
              ))
            )}
          </AchievementsGrid>
        </Section>
        )}
      </div>
      </HomeLayout>
    </ProtectedRoute>
  )
}

export default MisLogros
