/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import VideoPlayer from '../../../../../../components/VideoPlayer/VideoPlayer'
import {
    LessonTitle,
    Section,
    TestButton,
    Title,
    Tooltip,
    TooltipContainer,
    VideoContainer} from '../../../../../../styles/Lesson.styles'

interface LessonProps {
    currentLevel: number | null;
    currentUnit: number | null;
    currentLesson: number | null;
    setTest: (_test: Boolean) => void;
}

const Lesson: React.FC<LessonProps> = ({ currentLevel, currentUnit, currentLesson, setTest }) => {
    const [lesson, setLesson] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [videoCompleted, setVideoCompleted] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    useEffect(() => {
        const fetchLesson = async () => {
            if (currentLesson) {
                try {
                    const response = await axios.get('/ens-api/lessons')
                    const lessonsList = response.data.map((lesson: any) => ({
                        id: lesson.id,
                        title: lesson.title,
                        description: lesson.description,
                        order: lesson.order,
                        videoSrc: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
                    }))
                    const lesson = lessonsList.find((lesson) => lesson.id === currentLesson)
                    setLesson(lesson)
                } catch (error) {
                    console.error('Error fetching lesson:', error)
                } finally {
                    setIsLoading(false)
                }
            }
        }
        fetchLesson()
    }, [currentLesson])

    const handleVideoEnd = () => {
        setVideoCompleted(true)
    }

    const handleStartTest = () => {
        setTest(true)
    }

    return (
        <ProtectedRoute>
            <Section>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    lesson && (
                        <>
                            <Title>{lesson.title}</Title>
                            <LessonTitle>{lesson.description}</LessonTitle>
                            <VideoContainer>
                                <VideoPlayer
                                    src={lesson.videoSrc}
                                    onEnded={handleVideoEnd}
                                />
                            </VideoContainer>
                            <TooltipContainer>
                                <TestButton
                                    disabled={!videoCompleted}
                                    onClick={() => handleStartTest()}
                                    onMouseOver={() => !videoCompleted && setShowTooltip(true)}
                                    onMouseOut={() => setShowTooltip(false)}
                                >
                                    Realizar Test
                                </TestButton>
                                <Tooltip show={showTooltip}>
                                    Deber terminar el video antes
                                </Tooltip>
                            </TooltipContainer>
                        </>
                    )
                )}
            </Section>
        </ProtectedRoute>
    )
}

export default Lesson
