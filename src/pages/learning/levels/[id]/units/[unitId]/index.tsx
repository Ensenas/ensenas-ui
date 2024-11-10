/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../../../components/Spinner/Spinner'
import { Lesson, Level, useNavigation } from '../../../../../../context/NavigationLearningContext'
import {
    BackButton,
    Label,
    LessonCard,
    LessonItem,
    Section,
    Title
} from '../../../../../../styles/Learning.styles'
import { getFirstPartString, getSecondPartString } from '../../../../../../utils'


interface Challenge {
    id: number;
    description: string;
    video: string;
    title: string;
}
interface UserChallengeProgress {
    id: string;
    challenge: Challenge;
    started: boolean;
    completed: boolean;
}

const UnitLessons: React.FC = () => {
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>()
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
        lessons, isLoading, userProgress
    } = useNavigation()


    useEffect(() => {
        if (currentUnit && currentLevel) {
            setFilteredLessons(lessons?.filter(lesson => lesson.title.startsWith(currentUnit.title)).
                sort((a, b) => a.order - b.order))
        }
    }, [currentUnit, lessons, currentLevel])

    const handleLessonClick = (lesson: Lesson) => {
        setCurrentLesson(lesson) // Actualiza el estado de la unidad actual
        router.push(`/learning/levels/${currentLevel?.description}/units/${currentUnit?.description}
            /lessons/${lesson.description}`)
    }

    // Función para determinar el color del LessonCard
    const getLessonCardColor = (lessonId: number) => {
        const progress = userProgress?.find((progress) => progress.challenge.id === lessonId)
        if (progress) {

            if (progress.completed) {
                return '#41991b4f'
            }
        }
        return '#f0f0f0' // Color por defecto si no hay progreso
    }

    const getLessonStatus = (lessonId: number) => {
        const progress = userProgress?.find((progress) => progress.challenge.id === lessonId)
        if (progress) {
            if (progress.completed) return 'Completado'
            if (progress.started) return 'En Progreso'
        }
        return 'Pendiente'
    }

    const handleGoBack = () => {
        if (currentLevel) {
            setCurrentUnit(null)
            router.push(`/learning/levels/${currentLevel.description}`)
        } else {
            console.error('currentLevel es null.')
        }
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={'/learning'}>
                <Section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title>Lecciones de la Unidad</Title>
                        <BackButton onClick={handleGoBack}>
                        Volver atrás
                        </BackButton>
                    </div>
                    <div>
                        {isLoading ? (
                            <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                        ) : (
                            filteredLessons?.map(lesson => (
                                <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson)}>
                                    <LessonCard backgroundColor={getLessonCardColor(lesson.id)} style={{ position: 'relative' }}>
                                        <Label status={getLessonStatus(lesson.id)}>{getLessonStatus(lesson.id)}</Label>
                                        <h4>{getFirstPartString(lesson.description)}</h4>
                                        <h1>{getSecondPartString(lesson.description)}</h1>
                                        <h5>{lesson.title}</h5>
                                    </LessonCard>
                                </LessonItem>
                            ))
                        )}
                    </div>
                </Section>
            </HomeLayout>
        </ProtectedRoute>
    )
}

export default UnitLessons
