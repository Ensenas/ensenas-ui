import axios from 'axios'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import VideoRecorder from '../../../../../../components/Recorder/VideoRecorder'
import {
    CompletedLessonDescription, CompletedLessonItem, CompletedLessonPreview,
    CompletedLessonsList, CompletedLessonTitle, LessonTitle, Section, Title
} from '../../../../../../styles/test.styles'

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


interface LessonProps {
    currentLevel: number | null;
    currentUnit: number | null;
    currentLesson: number | null;
}

const LessonTest: React.FC<LessonProps> = ({ currentLevel, currentUnit, currentLesson }) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('/ens-api/lessons')
                const lesson = response.data.map((lesson: any) => ({
                    id: lesson.id,
                    title: lesson.title,
                    description: lesson.description,
                    order: lesson.order
                }))

            } catch (error) {
                console.error('Error fetching units:', error)
            } finally {
                setIsLoading(false) // Termina la carga, incluso si hay error
            }
        }
        fetchLessons()
    }, [])

    return (
        <ProtectedRoute>
            <Section>
                <Title>Lección 1: Introducción al Lenguaje de Señas</Title>
                <LessonTitle>Deberas realizar con tu mano la siguiente seña:</LessonTitle>
                <VideoRecorder />
                <Title>Volver a Ver</Title>
                <CompletedLessonsList>
                    {lessons.map((lesson) => (
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

export default LessonTest