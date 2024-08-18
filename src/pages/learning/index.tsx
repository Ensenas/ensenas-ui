import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import {
  LevelCard,
  Section,
  Title
} from '../../styles/Learning.styles'
import axios from 'axios';
import router from 'next/router';

interface MyLearningProps {
  setCurrentLevel: (levelId: number) => void;
}

const MyLearning: React.FC<MyLearningProps> = ({ setCurrentLevel }) => {
  const [levels, setLevels] = useState<any[]>([])
  /*
    useEffect(() => {
      // Simula una llamada al backend para obtener los niveles
      const mockLevels = [
        { id: 1, title: 'Nivel 1: Introducción' },
        { id: 2, title: 'Nivel 2: Intermedio' },
        { id: 3, title: 'Nivel 3: Avanzado' }
      ]
  
      // Simula un pequeño retraso para imitar la llamada a una API
      setTimeout(() => {
        setLevels(mockLevels)
      }, 500) // Retraso de 500ms
    }, [])
  */
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get('/ens-api/common/paths')
        const levelList = response.data.map((level: any) => ({
          id: level.id,
          title: level.title,
          description: level.description
        }))
        levelList.sort((a, b) => a.id < b.id)
        setLevels(levelList)
      } catch (error) {
        console.error('Error fetching levels:', error)
      }
    }
    fetchLevels()
  }, [])
  const handleLevelClick = (levelId: number) => {
    console.log('Learning', levelId)
    setCurrentLevel(levelId) // Actualiza el nivel actual
    // Aquí no cambiamos la URL, solo actualizamos el estado de la página
  }

  return (
    <ProtectedRoute>
      <Section>
        <Title>Niveles de Aprendizaje</Title>
        <div>
          {levels.map(level => (
            <div key={level.id} onClick={() => handleLevelClick(level.id)}>
              <LevelCard>
                <h1>{level.id}</h1>
                <h3>{level.title}</h3>
                <h5>{level.description}</h5>
              </LevelCard>
            </div>
          ))}
        </div>
      </Section>
    </ProtectedRoute>
  )
}

export default MyLearning
