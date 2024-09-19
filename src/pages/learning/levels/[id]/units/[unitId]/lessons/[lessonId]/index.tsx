/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../../../components/ProtectedRoute'
import VideoPlayer from '../../../../../../../../components/VideoPlayer/VideoPlayer'
import {
    LessonTitle,
    Section,
    TestButton,
    Title,
    Tooltip,
    TooltipContainer,
    VideoContainer} from '../../../../../../../../styles/Lesson.styles'
import { useNavigation } from '../../../../../../../../context/NavigationLearningContext'
import LoadingSpinner from '../../../../../../../../components/Spinner/Spinner'
import router from 'next/router'

const Lesson: React.FC = ({ }) => {
    const [lesson, setLesson] = useState<any>(null)
    const [videoCompleted, setVideoCompleted] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson, setTest } = useNavigation()

    const handleVideoEnd = () => {
        setVideoCompleted(true)
    }

    const handleStartTest = () => {
        setTest(true)
        router.push(`/learning/levels/${currentLevel?.id}/units/${currentUnit?.id}/lessons/${currentLesson?.id}/test`)
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={`/learning/levels/${currentLevel?.description}/units/${currentUnit?.description}/levels/${currentLesson?.description}`}>
                <Section>
                                <Title>{currentLesson?.title}</Title>
                                <LessonTitle>{currentLesson?.description}</LessonTitle>
                                <VideoContainer>
                                    <VideoPlayer
                                        src={currentLesson ? currentLesson.videoSrc : 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'}
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
                </Section>
            </HomeLayout>
            
        </ProtectedRoute>
    )
}

export default Lesson
