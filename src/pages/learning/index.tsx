import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import {
  LevelCard,
  Section,
  Title
} from '../../styles/Learning.styles'
import axios from 'axios';
import router from 'next/router';
import LoadingSpinner from '../../components/Spinner/Spinner';

interface MyLearningProps {
  setCurrentLevel: (levelId: number) => void;
}

const MyLearning: React.FC<MyLearningProps> = ({ setCurrentLevel }) => {
  const [levels, setLevels] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false); // Termina la carga, incluso si hay error
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
    </ProtectedRoute>
  )
}

export default MyLearning
