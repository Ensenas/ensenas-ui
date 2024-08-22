import axios from 'axios'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../../../../../../components/ProtectedRoute'
import VideoPlayer from '../../../../../../components/VideoPlayer/VideoPlayer'
import {
    LessonTitle,
    Section,
    Title,
    VideoContainer,
    TestButton,
    Tooltip,
    TooltipContainer
} from '../../../../../../styles/Lesson.styles'

interface LessonProps {
    currentLevel: number | null;
    currentUnit: number | null;
    currentLesson: number | null;
}

const Lesson: React.FC<LessonProps> = ({ currentLevel, currentUnit, currentLesson }) => {
    const [lesson, setLesson] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [videoCompleted, setVideoCompleted] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    useEffect(() => {
        const fetchLesson = async () => {
            if (currentLesson) {
                try {
                    const response = await axios.get(`/ens-api/lessons/${currentLesson}`)
                    setLesson(response.data)
                } catch (error) {
                    console.error('Error fetching lesson:', error)
                } finally {
                    setIsLoading(false)
                }
            }
        }
        fetchLesson()
        setLesson(mockLesson)
    }, [currentLesson])

    const mockLesson = {
        id: 1,
        title: 'Lección 3: Señales Avanzadas',
        description: 'Aprende señales más complejas y su uso en conversaciones.',
        videoSrc: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
    }

    const handleVideoEnd = () => {
        setVideoCompleted(true)
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
                                    onClick={() => alert('Realizar Test')}
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
