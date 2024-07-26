import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  margin: 20px;
`

const Title = styled.h2`
  margin-bottom: 20px;
`

const LessonList = styled.div`
  display: flex;
  flex-direction: column;
`

const LessonItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const VideoPreview = styled.img`
  width: 150px;
  height: auto;
  margin-right: 20px;
`

const LessonInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ajusta la distribución horizontal */
`

const LessonDetails = styled.div`
  flex: 1;
`

const LessonTitle = styled.h3`
  margin: 0;
  font-size: 1em;
`

const LessonDescription = styled.p`
  margin: 5px 0 10px;
`

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`

const ProgressBarContainer = styled.div`
  width: 60%; 
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10%;
`

const ProgressBar = styled.div`
  height: 20px;
  background: #0567b1;
  width: ${({ progress }) => progress}%;
`

const ProgressPercentage = styled.span`
  font-size: 1em;
  color: #0567b1;
`

const CompletedLessonsList = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten en varias filas si es necesario */
  gap: 20px; /* Espacio entre los elementos */
`

const CompletedLessonItem = styled.div`
  width: 150px; /* Ajusta el ancho según el diseño */
`

const CompletedLessonPreview = styled.img`
  width: 100%;
  height: auto;
`

const CompletedLessonTitle = styled.h4`
  margin: 10px 0 5px;
  font-size: 0.9em;
`

const CompletedLessonDescription = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: #666;
`

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
    <Section>
      <Title>Continuar Viendo</Title>
      <LessonList>
        {lessons.map((lesson) => (
          <LessonItem key={lesson.id}>
            <VideoPreview src={lesson.videoSrc} alt={`Preview de ${lesson.title}`} />
            <LessonInfo>
              <LessonDetails>
                <LessonTitle>{lesson.title}</LessonTitle>
                <LessonDescription>{lesson.description}</LessonDescription>
              </LessonDetails>
              <ProgressContainer>
                <ProgressBarContainer>
                  <ProgressBar progress={lesson.progress} />
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
  )
}

export default MyLearning
