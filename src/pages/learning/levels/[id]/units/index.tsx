import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../../components/Spinner/Spinner'
import {
    LessonCard,
    LessonItem,
    LessonTitle,
    Section,
    Title
} from '../../../../../styles/Learning.styles'

interface UnitLessonsProps {
    currentLevel: number | null;
    currentUnit: number | null;
    setCurrentLesson: (lessonId: number) => void;
}

const UnitLessons: React.FC<UnitLessonsProps> = ({ currentLevel, currentUnit, setCurrentLesson }) => {
    const [lessons, setLessons] = useState<any[]>([])
    const [allLessons, setAllLessons] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('/ens-api/lessons')
                const lessonsList = response.data.map((lesson: any) => ({
                    id: lesson.id,
                    title: lesson.title,
                    description: lesson.description,
                    order: lesson.order
                }))
                lessonsList.sort((a, b) => a.order < b.order)
                setAllLessons(lessonsList)
            } catch (error) {
                console.error('Error fetching units:', error)
            } finally {
                setIsLoading(false) // Termina la carga, incluso si hay error
            }
        }
        fetchLessons()
    }, [])

    useEffect(() => {
        if (currentLevel) {
            let filteredLessons: any[] = []
            switch (currentLevel) {
                case 2:
                    filteredLessons = allLessons.filter(lesson => lesson.title.startsWith('E'))
                    break
                case 3:
                    filteredLessons = allLessons.filter(lesson => lesson.title.startsWith('I'))
                    break
                case 4:
                    filteredLessons = allLessons.filter(lesson => lesson.title.startsWith('B'))
                    break
            }
            setLessons(filteredLessons)
        }
    }, [currentUnit, allLessons])

    const handleLessonClick = (lessonId: number) => {
        setCurrentLesson(lessonId) // Actualiza el estado de la unidad actual
    }

    return (
        <ProtectedRoute>
            <Section>
                <Title>Lecciones de la Unidad</Title>
                <div>
                    {isLoading ? (
                        <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                    ) : (
                        lessons.map(lesson => (
                            <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson.id)}>
                                <LessonCard>
                                    <h1>{lesson.title}</h1>
                                    <h3>{lesson.description}</h3>
                                </LessonCard>
                            </LessonItem>
                        )))}
                </div>
            </Section>
        </ProtectedRoute>
    )
}

export default UnitLessons
