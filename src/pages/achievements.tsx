import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../components/ProtectedRoute'
import {
  AchievementCard,
  AchievementsGrid,
  CardContent,
  CardTitle,
  Section,
  Title
} from '../styles/Achievements.styles'

// Componente principal
const MisLogros: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Función para obtener los logros del backend
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements') // URL de la API
        const data = await response.json()
        setAchievements(data)
      } catch (error) {
        console.error('Error al obtener los logros:', error)
      } finally {
        setLoading(false)
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
          {/* {achievements.length === 0 && <CardContent>No hay logros para mostrar.</CardContent>}
          
          {achievements.length > 0 &&  */}
          <>
            <AchievementCard>
              <CardTitle>Lecciones Vistas el Último Mes</CardTitle>
              <CardContent>15 lecciones</CardContent>
            </AchievementCard>
            <AchievementCard>
              <CardTitle>Nivel Actual</CardTitle>
              <CardContent>Intermedio</CardContent>
            </AchievementCard>
            <AchievementCard>
              <CardTitle>Certificados Obtenidos</CardTitle>
              <CardContent>Certificado de Nivel Básico</CardContent>
            </AchievementCard>
            <AchievementCard>
              <CardTitle>Estadísticas de Uso</CardTitle>
              <CardContent>Tiempo Total Dedicado: 20 horas</CardContent>
              <CardContent>Días Consecutivos de Uso: 10 días</CardContent>
              <CardContent>Nuevos Signos Aprendidos: 50 signos</CardContent>
            </AchievementCard>
          </>
          {/* } */}
        </AchievementsGrid>
      </Section>
    </ProtectedRoute>
  )
}

export default MisLogros
