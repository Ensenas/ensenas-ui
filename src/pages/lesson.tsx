/*
import React from 'react'

import ProtectedRoute from '../components/ProtectedRoute'
import VideoRecorder from '../components/Recorder/VideoRecorder'
import {
    CompletedLessonDescription, CompletedLessonItem, CompletedLessonPreview,
    CompletedLessonsList, CompletedLessonTitle, LessonDescription, LessonDetails, LessonInfo,
    LessonItem, LessonList, LessonTitle, ProgressBar, ProgressBarContainer, ProgressContainer,
    ProgressPercentage, Section, Title, VideoPreview
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

const Lesson: React.FC = () => {
    return (
        <ProtectedRoute>
            <Section>
                <Title>Lección 1: Introducción al Lenguaje de Señas</Title>
                <LessonTitle>Deberas realizar con tu mano la siguiente seña:</LessonTitle>
                <VideoRecorder />
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

export default Lesson

*/

// pages/myLearning/levels/[levelId]/units/[unitId].tsx

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import {
    LessonItem,
    LessonTitle,
    Section,
    Title
} from '../styles/Learning.styles'
import Link from 'next/link'

const UnitLessons: React.FC = () => {
    const router = useRouter()
    const { levelId, unitId } = router.query
    const [lessons, setLessons] = useState<any[]>([])

    /*
    useEffect(() => {
      if (levelId && unitId) {
        // Simula una llamada al backend para obtener las lecciones de la unidad
        fetch(`/api/levels/${levelId}/units/${unitId}/lessons`)
          .then(response => response.json())
          .then(data => setLessons(data))
          .catch(error => console.error('Error fetching lessons:', error))
      }
    }, [levelId, unitId])
    */

    useEffect(() => {
        // Simula una llamada al backend para obtener los niveles
        const mockLessons = [
            { id: 1, title: 'Unidad 1: A' },
            { id: 2, title: 'Unidad 2: B' },
            { id: 3, title: 'Unidad 3: C' }
        ]

        // Simula un pequeño retraso para imitar la llamada a una API
        setTimeout(() => {
            setLessons(mockLessons)
        }, 500) // Retraso de 500ms
    }, [])

    return (
        <ProtectedRoute>
            <Section>
                <Title>Lecciones de la Unidad</Title>
                <div>
                    {lessons.map(lesson => (
                        <LessonItem key={lesson.id}>
                            <Link href={`/myLearning/levels/${levelId}/units/${unitId}/lessons/${lesson.id}`} passHref>
                                <LessonTitle>{lesson.title}</LessonTitle>
                            </Link>
                        </LessonItem>
                    ))}
                </div>
            </Section>
        </ProtectedRoute>
    )
}

export default UnitLessons