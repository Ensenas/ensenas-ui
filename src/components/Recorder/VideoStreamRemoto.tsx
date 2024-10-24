/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
'use client'

import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'
import styled from 'styled-components'

import { useNavigation } from '../../context/NavigationLearningContext'
import ResultScreen from '../ResultScreen/ResultScreen'
import Spinner from '../Spinner/Spinner'
import { Container, Overlay, WebcamContainer } from './RecorderElements'

const PreviewContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 200px;
  height: 150px;
  border: 2px solid #000;
  overflow: hidden;
  z-index: 10;
`

const MainImageContainer = styled.div`
  position: relative;
  width: 70%;
  height: 620px;
`

const FraseContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
`

export default function VideoStreamRemoto({ level, unit, lesson, onComplete }) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [attempts, setAttempts] = useState(0)
    const [reset, setReset] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [border, setBorder] = useState('unset')
    const [isConnected, setIsConnected] = useState(false)
    const [showResultScreen, setShowResultScreen] = useState(false)
    const [frase, setFrase] = useState<string[]>([])
    const [fraseIndex, setFraseIndex] = useState(0)
    const [expectedFrase, setExpectedFrase] = useState([''])
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)
    const router = useRouter()
    const { currentUnit } = useNavigation()
    const lessonsMapping = {
        'yo trabajo de medico': 'yo trabajar medico',
        'mi hermana estudia en la universidad': 'mi hermana estudiar universidad',
        'mi color favorito es el rojo': 'mi color favorito rojo',
        'el-ella tiene hambre': 'el-ella hambre'
    }

    useEffect(() => {
        if (lesson && lesson.description) {
            const fraseInicial = (lessonsMapping[findWord(lesson.description)]
                ? lessonsMapping[findWord(lesson.description)].split(' ')
                : findWord(lesson.description).split(' '))
            setExpectedFrase(fraseInicial)
        }
    }, [lesson.description])

    useEffect(() => {
        const newSocket = io('wss://alarma.mywire.org:3050')
        setSocket(newSocket)

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
            setIsConnected(true)
            setBorder('2px solid #000')
        })

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason)
            setIsConnected(false)
        })

        return () => {
            newSocket.disconnect()
            console.log('Socket disconnected:', newSocket.id)
        }
    }, []) // Solo se ejecuta una vez al montar

    useEffect(() => {
        if (!socket) return

        const handleProcessedFrame = (data) => {
            if (outputRef.current) {
                outputRef.current.src = data.image
            }

            // Check if the word is correct and show result screen
            if (data.palabra_detectada != null) {
                if (data.palabra_detectada === expectedFrase[fraseIndex]) {
                    checkWords(data.palabra_detectada)
                } else {
                    setIsSuccess(false)
                    setShowResultScreen(true)
                }
            }
        }

        socket.on('processed_frame', handleProcessedFrame)

        return () => {
            socket.off('processed_frame', handleProcessedFrame)
        }
    }, [socket, expectedFrase, fraseIndex, frase])

    const sendFrame = useCallback(() => {
        if (webcamRef.current && canvasRef.current) {
            const video = webcamRef.current.video
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (video && context) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

                const dataURL = canvas.toDataURL('image/jpeg', 0.5)
                if (socket) {
                    const unit: string | undefined = findUnit()
                    const word: string | undefined = expectedFrase[fraseIndex]


                    socket.emit('corregir_video_stream', { frase: word, image: dataURL, reset: reset })
                    setReset(false)
                }
            }
        }
    }, [socket, lesson.description, reset])

    useEffect(() => {
        const interval = setInterval(sendFrame, 250)
        return () => clearInterval(interval)
    }, [sendFrame])

    const findUnit = (): string | undefined => {
        if (currentUnit) {
            return (currentUnit.description.split(':').pop()?.trim().toLowerCase())?.replace(' ', '_')
        }
    }

    const findWord = (lesson_description): string => {
        return lesson_description.split(':').pop()?.trim().toLowerCase()
    }

    const checkWords = (word) => {
        setFrase([...frase, expectedFrase[fraseIndex]])
        setFraseIndex(fraseIndex + 1)

        if (expectedFrase.length - 1 === fraseIndex) {
            setIsSuccess(true)
            setShowResultScreen(true)
            // Llamar a onComplete cuando se complete la lección
            if (onComplete) {
                onComplete()
            }
        }
    }

    const handleNextWord = () => {
        setShowResultScreen(false)
        setAttempts(0)
        router.push(`/learning/levels/${level?.description}/units/${unit.description}`)
    }

    const handleRestart = () => {
        setShowResultScreen(false)
        setAttempts(0)
        setReset(true)
        if (fraseIndex === expectedFrase.length) {
            setFraseIndex(0)
            setFrase([])
        }
    }

    const renderFraseProgress = () => {
        return expectedFrase.map((word, index) => (
            <span key={index} style={{ margin: '0 10px', textDecoration: 'underline' }}>
                {fraseIndex > index ? word : '_'.repeat(word.length)}
            </span>
        ))
    }

    return (
        <div>
            {isConnected ? (
                <div>
                    <Container>
                        <FraseContainer>
                            {renderFraseProgress()}
                        </FraseContainer>
                        <MainImageContainer>
                            <img
                                ref={outputRef}
                                style={{ width: '100%', height: '100%', border: border, objectFit: 'cover' }}
                                alt="Processed output"
                            />
                            <PreviewContainer>
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    videoConstraints={{
                                        facingMode: 'user',
                                        width: 1280,
                                        height: 720
                                    }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </PreviewContainer>
                        </MainImageContainer>

                        <WebcamContainer>
                            <Webcam
                                audio={false}
                                videoConstraints={{
                                    facingMode: 'user',
                                    width: 1920,
                                    height: 1080
                                }}
                                style={{ opacity: '0' }}
                            />
                        </WebcamContainer>

                        <canvas ref={canvasRef} style={{ display: 'none' }} />

                        <Overlay />
                    </Container>
                    {showResultScreen && (
                        <ResultScreen
                            isSuccess={isSuccess}
                            onNextWord={handleNextWord}
                            onRestart={handleRestart}
                        />
                    )}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}
