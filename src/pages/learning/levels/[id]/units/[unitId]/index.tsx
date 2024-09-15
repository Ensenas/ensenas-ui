/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from 'next/router'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../../../components/Spinner/Spinner'
import { useNavigation } from '../../../../../../context/NavigationLearningContext'
import {
    LessonCard,
    LessonItem,
    // LessonTitle,
    Section,
    Title
} from '../../../../../../styles/Learning.styles'

interface UnitLessonsProps {
    currentLevel: number | null;
    currentUnit: number | null;
    setCurrentLesson: (idLesson :number) => void;
}

const UnitLessons: React.FC<UnitLessonsProps> = ({}) => {
    const [lessons, setLessons] = useState<any[]>([])
    const [allLessons, setAllLessons] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson } = useNavigation()
  

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('/ens-api/lessons')
                console.log('DATA', response.data)
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
    }, [currentLevel])

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
    }, [currentUnit, allLessons, currentLevel])

    const handleLessonClick = (lessonId: number) => {
        setCurrentLesson(lessonId) // Actualiza el estado de la unidad actual
        router.push(`/learning/levels/${currentLevel}/units/${currentUnit}/lessons/${lessonId}`)
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={`/learning/levels/${currentLevel}/units/${currentUnit}`}>
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
            </HomeLayout>
        </ProtectedRoute>
    )
}

export default UnitLessons