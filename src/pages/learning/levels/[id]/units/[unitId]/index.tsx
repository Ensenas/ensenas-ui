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
import { getFirstPartString, getSecondPartString } from '../../../../../../utils'


const UnitLessons: React.FC = ({}) => {
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>()
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
        lessons, isLoading
     } = useNavigation()
  

    useEffect(() => {

        if (currentUnit && currentLevel) {
            setFilteredLessons(lessons?.filter(lesson => lesson.title.startsWith(currentUnit.title)).
            sort((a, b) => a.order - b.order))
        }
    }, [currentUnit, lessons, currentLevel])

    const handleLessonClick = (lesson: Lesson) => {
        console.log(currentLevel)
        console.log(currentUnit)
        console.log(currentLesson)
        console.log(lesson.videoSrc)
        setCurrentLesson(lesson) // Actualiza el estado de la unidad actual
        router.push(`/learning/levels/${currentLevel?.description}/units/${currentUnit?.description}
            /lessons/${lesson.description}`)
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
                                        <h4>{getFirstPartString(lesson.description)}</h4>
                                        <h1>{getSecondPartString(lesson.description)}</h1>
                                        <h5>{lesson.title}</h5>
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
