/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../../../components/Spinner/Spinner'
import { Lesson, useNavigation } from '../../../../../../context/NavigationLearningContext'
import {
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
    const [userProgress, setUserProgress] = useState<UserChallengeProgress[]>([])
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
        lessons, isLoading
    } = useNavigation()

    useEffect(() => {
        // Obtener el progreso de los desafíos del usuario
        const fetchUserProgress = async () => {
            const token = localStorage.getItem('authToken')
            if (!token) {
                console.error('No se encontró el token JWT, el usuario no está autenticado.')
                return
            }

            try {
                const response = await axios.get('/ens-api/users/challenge-progress', {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                setUserProgress(response.data)
            } catch (error) {
                console.error('Error al obtener el progreso del desafío:', error)
            }
        }

        fetchUserProgress()
    }, [])

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
        const progress = userProgress.find((progress) => progress.challenge.id === lessonId)
        if (progress) {
            if (progress.started && !progress.completed) {
                return '#b3b300'
            }
            if (progress.completed) {
                return '#9fe2bf'
            }
        }
        return '#f0f0f0' // Color por defecto si no hay progreso
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={'/learning'}>
                <Section>
                    <Title>Lecciones de la Unidad</Title>
                    <div>
                        {isLoading ? (
                            <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                        ) : (
                            filteredLessons?.map(lesson => (
                                <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson)}>
                                    <LessonCard backgroundColor={getLessonCardColor(lesson.id)}>
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
