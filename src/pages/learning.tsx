/*
import React from 'react'
import Link from 'next/link'

import ProtectedRoute from '../components/ProtectedRoute'
import {
  CompletedLessonDescription,
  CompletedLessonItem,
  CompletedLessonPreview,
  CompletedLessonsList,
  CompletedLessonTitle,
  LessonDescription,
  LessonDetails,
  LessonInfo,
  LessonItem,
  LessonList,
  LessonTitle,
  ProgressBar,
  ProgressBarContainer,
  ProgressContainer,
  ProgressPercentage,
  Section,
  Title,
  VideoPreview
} from '../styles/Learning.styles'

const lessons = [
  {
    id: 1,
    title: 'Lección 1: Introducción al Lenguaje de Señas',
    description: 'Aprende los conceptos básicos y las primeras señales.',
    videoSrc: '/path/to/video/preview1.jpg',
    progress: 40
  },
  {
    id: 2,
    title: 'Lección 2: Señales Comunes',
    description: 'Domina las señales más utilizadas en el día a día.',
    videoSrc: '/path/to/video/preview2.jpg',
    progress: 75
  }
  // Agrega más lecciones según sea necesario
]

const completedLessons = [
  {
    id: 1,
    title: 'Lección 3: Señales Avanzadas',
    description: 'Aprende señales más complejas y su uso en conversaciones.',
    videoSrc: '/path/to/completed-video/preview1.jpg'
  },
  {
    id: 2,
    title: 'Lección 4: Comunicación en Situaciones Especiales',
    description: 'Cómo usar el lenguaje de señas en situaciones específicas.',
    videoSrc: '/path/to/completed-video/preview2.jpg'
  }
  // Agrega más lecciones completadas según sea necesario
]

const MyLearning: React.FC = () => {
  return (
    <ProtectedRoute>
      <Section>
        <Title>Continuar Viendo</Title>
        <LessonList>
          {lessons.map((lesson) => (
            <LessonItem key={lesson.id}>
              <Link href={`/lessons/${lesson.id}`} passHref>
                <VideoPreview src={lesson.videoSrc} alt={`Preview de ${lesson.title}`} />
              </Link>
              <LessonInfo>
                <LessonDetails>
                  <Link href={`/lessons/${lesson.id}`} passHref>
                    <LessonTitle>{lesson.title}</LessonTitle>
                  </Link>
                  <LessonDescription>{lesson.description}</LessonDescription>
                </LessonDetails>
                <ProgressContainer>
                  <ProgressBarContainer>
                    <ProgressBar />
                  </ProgressBarContainer>
                  <ProgressPercentage>{lesson.progress}%</ProgressPercentage>
                </ProgressContainer>
              </LessonInfo>
            </LessonItem>
          ))}
        </LessonList>
        <Title>Volver a Ver</Title>
        <CompletedLessonsList>
          {completedLessons.map((lesson) => (
            <CompletedLessonItem key={lesson.id}>
              <CompletedLessonPreview src={lesson.videoSrc} alt={`Preview de ${lesson.title}`} />
              <CompletedLessonTitle>{lesson.title}</CompletedLessonTitle>
              <CompletedLessonDescription>{lesson.description}</CompletedLessonDescription>
            </CompletedLessonItem>
          ))}
        </CompletedLessonsList>
      </Section>
    </ProtectedRoute>
  )
}

export default MyLearning
*/

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../components/ProtectedRoute'
import {
  LevelCard,
  Section,
  Title
} from '../styles/Learning.styles'

const MyLearning: React.FC = () => {
  const [levels, setLevels] = useState<any[]>([])

  /*
useEffect(() => {
  // Simula una llamada al backend para obtener los niveles
  fetch('/api/levels')
    .then(response => response.json())
    .then(data => setLevels(data))
    .catch(error => console.error('Error fetching levels:', error))
}, [])
*/
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

  return (
    <ProtectedRoute>
      <Section>
        <Title>Niveles de Aprendizaje</Title>
        <div>
          {levels.map(level => (
            <Link key={level.id} href={`/myLearning/levels/${level.id}`} passHref>
              <LevelCard>
                <h3>{level.title}</h3>
              </LevelCard>
            </Link>
          ))}
        </div>
      </Section>
    </ProtectedRoute >
  )
}

export default MyLearning