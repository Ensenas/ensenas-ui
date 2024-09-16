/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../components/ProtectedRoute'
import {
  CardContent,
  CardTitle,
  Section,
  StatisticsCard,
  StatisticsGrid,
  Title
} from '../styles/Statistics.styles'

// Componente principal
const Statistics: React.FC = () => {
  const [Statistics, setStatistics] = useState<any[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     // Función para obtener los logros del backend
//     const fetchStatistics = async () => {
//       try {
//         const response = await fetch('/api/statistics') // URL de la API
//         const data = await response.json()
//         setStatistics(data)
//       } catch (error) {
//         console.error('Error al obtener los logros:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStatistics()
//   }, [])

//   if (loading) {
//     return <Section>Cargando...</Section>
//   }

  return (
    <ProtectedRoute>
      <Section>
        <Title>Estadisticas</Title>
        <StatisticsGrid>
          {/* {statistics.length === 0 && <CardContent>No hay logros para mostrar.</CardContent>}
          
          {statistics.length > 0 &&  */}
          <>
            <StatisticsCard>
              <CardTitle>Lecciones Vistas el Último Mes</CardTitle>
              <CardContent>15 lecciones</CardContent>
            </StatisticsCard>
            <StatisticsCard>
              <CardTitle>Nivel Actual</CardTitle>
              <CardContent>Intermedio</CardContent>
            </StatisticsCard>
            <StatisticsCard>
              <CardTitle>Certificados Obtenidos</CardTitle>
              <CardContent>8 certificados</CardContent>
            </StatisticsCard>
            <StatisticsCard>
              <CardTitle>Estadísticas de Uso</CardTitle>
              <CardContent>Tiempo Total Dedicado: 20 horas</CardContent>
              <CardContent>Días Consecutivos de Uso: 10 días</CardContent>
              <CardContent>Nuevos Signos Aprendidos: 50 signos</CardContent>
            </StatisticsCard>
          </>
          {/* } */}
        </StatisticsGrid>
      </Section>
    </ProtectedRoute>
  )
}

export default Statistics

