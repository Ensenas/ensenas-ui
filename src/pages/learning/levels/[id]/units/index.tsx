import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../../../../../components/ProtectedRoute'
import {
    LessonCard,
    LessonItem,
    LessonTitle,
    Section,
    Title
} from '../../../../../styles/Learning.styles'
import LoadingSpinner from '../../../../../components/Spinner/Spinner'

interface UnitLessonsProps {
    currentLevel: number | null;
    currentUnit: number | null;
}

const UnitLessons: React.FC<UnitLessonsProps> = ({ currentLevel, currentUnit }) => {
    const [lessons, setLessons] = useState<any[]>([])
    const [allLessons, setAllLessons] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false); // Termina la carga, incluso si hay error
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

    // useEffect(() => {
    //     if (levelId && unitId) {
    //         // Simula una llamada al backend para obtener las lecciones de la unidad
    //         const mockLessons = [
    //             { id: 1, title: 'Lección 1: Introducción' },
    //             { id: 2, title: 'Lección 2: Avanzado' }
    //         ]

    //         setTimeout(() => {
    //             setLessons(mockLessons)
    //         }, 500)
    //     }
    // }, [levelId, unitId])

    return (
        <ProtectedRoute>
            <Section>
                <Title>Lecciones de la Unidad</Title>
                <div>
                    {isLoading ? (
                        <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                    ) : (
                        lessons.map(lesson => (
                            <LessonItem key={lesson.id}>
                                <LessonCard>
                                    <LessonTitle>{lesson.title}</LessonTitle>
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
