/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from 'next/router'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../../../components/Spinner/Spinner'
import { Lesson, useNavigation } from '../../../../../../context/NavigationLearningContext'
import {
    LessonCard,
    LessonItem,
    // LessonTitle,
    Section,
    Title
} from '../../../../../../styles/Learning.styles'


const UnitLessons: React.FC = ({}) => {
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>()
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
        lessons, isLoading
     } = useNavigation()
  

    useEffect(() => {

        if (currentUnit && currentLevel) {
            setFilteredLessons(lessons?.filter(lesson => lesson.title.startsWith(currentUnit.title)).sort((a, b) => a.order - b.order))
        }
    }, [currentUnit, lessons, currentLevel])

    const handleLessonClick = (lesson: Lesson) => {
        lesson.videoSrc = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
        setCurrentLesson(lesson) // Actualiza el estado de la unidad actual
        router.push(`/learning/levels/${currentLevel?.description}/units/${currentUnit?.description}/lessons/${lesson.description}`)
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={`/learning/levels/${currentLevel?.description}/units/${currentUnit?.description}`}>
                <Section>
                    <Title>Lecciones de la Unidad</Title>
                    <div>
                        {isLoading ? (
                            <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                        ) : (
                            filteredLessons?.map(lesson => (
                                <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson)}>
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
