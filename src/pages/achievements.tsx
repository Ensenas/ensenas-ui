import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// Estilos
const Section = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  margin: 0;
  margin-bottom: 2rem;
`

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const AchievementCard = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 80%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`

const CardTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #0567b1;
`

const CardContent = styled.p`
  font-size: 1.2em;
  color: #555;
  margin-bottom: 10px;
`

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
    <Section>
      <Title>Mis Logros</Title>
      <AchievementsGrid>
        {/* {achievements.length === 0 && <CardContent>No hay logros para mostrar.</CardContent>}
        
        {achievements.length > 0 &&  */}
          <><AchievementCard>
            <CardTitle>Lecciones Vistas el Último Mes</CardTitle>
            <CardContent>15 lecciones</CardContent>
          </AchievementCard><AchievementCard>
              <CardTitle>Nivel Actual</CardTitle>
              <CardContent>Intermedio</CardContent>
            </AchievementCard><AchievementCard>
              <CardTitle>Certificados Obtenidos</CardTitle>
              <CardContent>Certificado de Nivel Básico</CardContent>
            </AchievementCard><AchievementCard>
              <CardTitle>Estadísticas de Uso</CardTitle>
              <CardContent>Tiempo Total Dedicado: 20 horas</CardContent>
              <CardContent>Días Consecutivos de Uso: 10 días</CardContent>
              <CardContent>Nuevos Signos Aprendidos: 50 signos</CardContent>
            </AchievementCard></>
        {/* } */}
      </AchievementsGrid>
    </Section>
  )
}

export default MisLogros
