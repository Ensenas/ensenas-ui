/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../../../../components/ProtectedRoute'
import VideoRecorder from '../../../../../../../../../components/Recorder/VideoRecorder'
import VideoStreamRemoto from '../../../../../../../../../components/Recorder/VideoStreamRemoto'
import { useNavigation } from '../../../../../../../../../context/NavigationLearningContext'
import {
    InstructionText,
    LessonTitle, Section, Title
} from '../../../../../../../../../styles/test.styles'


interface LessonProps {
    currentLevel: number | null;
    currentUnit: number | null;
    currentLesson: number | null;
    setTest: (test: Boolean) => void;
}

const LessonTest: React.FC<LessonProps> = ({ }) => {

    // const [isLoading, setIsLoading] = useState(true)
    // const [lesson, setLesson] = useState<any>(null)
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson,
        setCurrentLesson, test, setTest } = useNavigation()


    // useEffect(() => {
    //     const fetchLesson = async () => {
    //         if (currentLesson) {
    //             try {
    //                 const response = await axios.get('/ens-api/lessons')
    //                 const lessonsList = response.data.map((lesson: any) => ({
    //                     id: lesson.id,
    //                     title: lesson.title,
    //                     description: lesson.description,
    //                     order: lesson.order
    //                 }))
    //                 const lesson = lessonsList.find((lesson) => lesson.id === currentLesson)
    //                 setLesson(lesson)
    //             } catch (error) {
    //                 console.error('Error fetching lesson:', error)
    //             } finally {
    //                 setIsLoading(false)
    //             }
    //         }
    //     }
    //     fetchLesson()
    // }, [])

    return (
        <ProtectedRoute>
            <HomeLayout activePage={`/learning/levels/${currentLevel?.description}
                /units/${currentUnit?.description}/levels/${currentLesson?.description}`}>
                <Section>

                    <Title>{currentLesson?.title}</Title>
                    <LessonTitle>Deberás realizar con tu mano la siguiente seña: {currentLesson?.description}.</LessonTitle>
                    <InstructionText>Por favor, sigue las instrucciones y graba tu respuesta. Para reintentar, presioná la tecla Enter.</InstructionText>
                    <VideoStreamRemoto unit={currentUnit} lesson={currentLesson} />

                </Section>
            </HomeLayout>
        </ProtectedRoute>
    )
}

export default LessonTest