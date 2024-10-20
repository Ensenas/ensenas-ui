/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../../../../../components/Spinner/Spinner'
import VideoPlayer from '../../../../../../../../components/VideoPlayer/VideoPlayer'
import { useNavigation } from '../../../../../../../../context/NavigationLearningContext'
import { BackButton } from '../../../../../../../../styles/Learning.styles'
import {
    LessonTitle,
    Section,
    TestButton,
    Title,
    Tooltip,
    TooltipContainer,
    VideoContainer
} from '../../../../../../../../styles/Lesson.styles'
import {
    InstructionText
} from '../../../../../../../../styles/test.styles'
import { getFirstPartString } from '../../../../../../../../utils/index'

const Lesson: React.FC = ({ }) => {
    const [lesson, setLesson] = useState<any>(null)
    const [videoCompleted, setVideoCompleted] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson,
        setCurrentLesson, setTest } = useNavigation()

    const handleVideoEnd = () => {
        setVideoCompleted(true)
    }

    const handleStartTest = () => {
        setTest(true)
        router.push(`/learning/levels/${currentLevel?.id}/units/${currentUnit?.id}
            /lessons/${currentLesson?.id}/test`)
    }

    const handleGoBack = () => {
        if (currentUnit && currentLevel) {
            setCurrentLesson(null)
            router.push(`/learning/levels/${currentLevel.description}/units/${currentUnit.description}`)
        } else {
            console.error('currentLevel es null.')
        }
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={'/learning'}>
                <Section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title>{currentLesson?.title}</Title>
                        <BackButton onClick={handleGoBack}>
                        Volver atrás
                        </BackButton>
                    </div>
                    <LessonTitle>{currentLesson?.description}</LessonTitle>
                    <InstructionText>
                        {currentLesson?.detailedDescription}
                    </InstructionText>
                    <VideoContainer>
                        <VideoPlayer
                            src={currentLesson ? currentLesson.videoSrc :
                                ''}
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
                            Antes de realizar el test, debe terminar de ver el video.
                        </Tooltip>
                    </TooltipContainer>
                </Section>
            </HomeLayout>
        </ProtectedRoute>
    )
}

export default Lesson
