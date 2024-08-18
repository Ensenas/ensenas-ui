import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '../../../../../components/ProtectedRoute'
import {
    LessonItem,
    LessonTitle,
    Section,
    Title
} from '../../../../../styles/Learning.styles'

interface UnitLessonsProps {
    levelId: number | null;
    unitId: number | null;
}

const UnitLessons: React.FC<UnitLessonsProps> = ({ levelId, unitId }) => {
    const [lessons, setLessons] = useState<any[]>([])

    useEffect(() => {
        if (levelId && unitId) {
            // Simula una llamada al backend para obtener las lecciones de la unidad
            const mockLessons = [
                { id: 1, title: 'Lección 1: Introducción' },
                { id: 2, title: 'Lección 2: Avanzado' }
            ]

            setTimeout(() => {
                setLessons(mockLessons)
            }, 500)
        }
    }, [levelId, unitId])

    return (
        <ProtectedRoute>
            <Section>
                <Title>Lecciones de la Unidad</Title>
                <div>
                    {lessons.map(lesson => (
                        <LessonItem key={lesson.id}>
                            {/* Manejo de clics para cada lección si es necesario */}
                            <LessonTitle>{lesson.title}</LessonTitle>
                        </LessonItem>
                    ))}
                </div>
            </Section>
        </ProtectedRoute>
    )
}

export default UnitLessons
