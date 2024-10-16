/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
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
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get('/ens-api/lessons')
        const achievementsList = response.data.map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          order: lesson.order
        }))
        achievementsList.sort((a, b) => a.order < b.order)
        achievementsList[0].completed = true
        setAchievements(achievementsList)
      } catch (error) {
        console.error('Error fetching units:', error)
      } finally {
        setLoading(false) // Termina la carga, incluso si hay error
      }
    }
    fetchAchievements()
  }, [])

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
