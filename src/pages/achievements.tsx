/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../components/ProtectedRoute'
import {
  AchievementCard,
  AchievementsGrid,
  CardContent,
  CardTitle,
  Medal,
  Section,
  Title
} from '../styles/Achievements.styles'

// Componente principal
const MisLogros: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Mocked data
  const mockAchievements = [
    { id: 1, title: 'Lecciones Vistas el Último Mes', description: '15 lecciones', completed: true },
    { id: 2, title: 'Nivel Actual', description: 'Intermedio', completed: false },
    { id: 3, title: 'Certificados Obtenidos', description: 'Certificado de Nivel Básico', completed: true },
    { id: 4, title: 'Estadísticas de Uso', description: 'Tiempo Total Dedicado: 20 horas', completed: false }
    // Agrega más medallas mockeadas si lo deseas
  ]

  // useEffect(() => {
  //   // Función para obtener los logros del backend
  //   const fetchAchievements = async () => {
  //     try {
  //       // const response = await fetch('/api/achievements') // URL de la API
  //       // const data = await response.json()
  //       setAchievements(mockAchievements)
  //     } catch (error) {
  //       console.error('Error al obtener los logros:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchAchievements()
  // }, [])

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
            setAchievements(achievementsList)
        } catch (error) {
            console.error('Error fetching units:', error)
        } finally {
            setLoading(false) // Termina la carga, incluso si hay error
        }
    }
    fetchAchievements()
}, [])

  if (loading) {
    return <Section>Cargando...</Section>
  }


  return (
    <ProtectedRoute>
      <Section>
        <Title>Mis Logros</Title>
        <AchievementsGrid>
          {achievements.length === 0 ? (
            <CardContent>No hay logros para mostrar.</CardContent>
          ) : (
            achievements.map((achievement) => (
              <AchievementCard key={achievement.id}>
                <CardTitle>{achievement.title}</CardTitle>
                <Medal completed={achievement.completed} />
                <CardContent>{achievement.description}</CardContent>
              </AchievementCard>
            ))
          )}
        </AchievementsGrid>
      </Section>
    </ProtectedRoute>
  )
}

export default MisLogros
