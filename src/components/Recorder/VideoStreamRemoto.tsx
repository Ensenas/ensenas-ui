/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'
import Spinner from '../Spinner/Spinner'
import { Lesson, Unit, useNavigation } from '../../context/NavigationLearningContext'
import { Container, Overlay, WebcamContainer } from './RecorderElements'
import ResultScreen from "../ResultScreen/ResultScreen"

const unitWords = {
    familiares: ['papa', 'mama', 'hijo', 'hermana'],
    colores: ['amarillo', 'negro', 'rojo', 'verde']
}

export default function VideoStreamRemoto({ unit, lesson }) {
    const [socket, setSocket] = useState<Socket | null>(null)
    // const [fps, setFps] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [reset, setReset] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [border, setBorder] = useState('unset')
    const [isGivingExam, setisGivingExam] = useState(true)
    const [isConnected, setIsConnected] = useState(false)
    const [showResultScreen, setShowResultScreen] = useState(false)
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit,
        currentLesson, setCurrentLesson, setTest } = useNavigation()

    useEffect(() => {
        // console.log(unit)
        // console.log(lesson)

        const newSocket = io('wss://alarma.mywire.org:3051')

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
            setIsConnected(true)
            setBorder('2px solid #000')
        })

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason)
        })

        newSocket.on('processed_frame', (data) => {
            console.log("palabra", data.palabra_detectada)

            // setFps((1 / data.total_time_time))
            if (outputRef.current) {
                outputRef.current.src = data.image
            }

            // Check if the word is correct and show result screen
            if (data.palabra_detectada != undefined) {
                if (data.palabra_detectada === findWord(lesson.description)) {
                    // console.log(data.palabra_detectada)
                    // console.log(findWord())
                    setIsSuccess(true)
                    setShowResultScreen(true)
                }
                else {
                    setAttempts(prev => prev + 1)
                    if (attempts >= 2) {
                        setIsSuccess(false)
                        setShowResultScreen(true)
                    }
                }
            }
        })

        setSocket(newSocket)
        newSocket.emit('unit_selected', { unidad: findUnit() })

        const handleKeyPress = (event) => {
            if (event.keyCode === 13) {
                setReset(true)
                setBorder('3px solid #039619')
                setisGivingExam(false)
                // socket.emit('corregir_video_stream', { reset: true })
                // console.log("send")
            }
        }

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            newSocket.disconnect()
            document.removeEventListener('keydown', handleKeyPress);
            console.log('Socket disconnected:', newSocket.id)
        }
    }, [attempts])

    const sendFrame = () => {
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
                    const word: string | undefined = findWord(lesson.description)

                    socket.emit('corregir_video_stream', { frase: word, image: dataURL, reset: reset })
                    setReset(false)
                }
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(sendFrame, 250)
        return () => clearInterval(interval)
    }, [socket, sendFrame])

    const findUnit = (): string | undefined => {
        if (currentUnit) {
            return currentUnit.description.split(':').pop()?.trim().toLowerCase()
        }
    }

    const findWord = (lesson_description): string | undefined => {
        return lesson_description.split(':').pop()?.trim().toLowerCase()
    }

    const handleNextWord = () => {
        setShowResultScreen(false)
        setAttempts(0)
        // Logic to move to the next word
        // This depends on how you manage your lessons and words
        // Example: setCurrentLesson(nextLesson)
    }

    const handleRestart = () => {
        setShowResultScreen(false)
        setAttempts(0)
        setReset(true)
    }

    // const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const newUnit = e.target.value as keyof typeof unitWords;
    //     setUnit(newUnit);
    //     setSelectedWord(unitWords[newUnit][0]);
    //     socket?.emit('unit_selected', { unidad: newUnit });
    // }

    // const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const newMode = e.target.value;
    //     setMode(newMode);
    //     socket?.emit('reset_text');
    // }

    // const handleWordChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedWord(e.target.value);
    //     socket?.emit('reset_text');
    // }

    return (
        <div>
            {isConnected ? (
                <div>
                    <div>
                        <Container>

                            <img ref={outputRef} style={{ width: '70%', height: '620px', border: border }} />

                            <WebcamContainer>
                                <Webcam
                                    ref={webcamRef}
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
                    </div>
                    {showResultScreen && (
                        <ResultScreen
                            isSuccess={false}
                            onNextWord={handleNextWord}
                            onRestart={handleRestart}
                        />
                    )}
                </div>
            ) : (
                <Spinner />
            )
            }
        </div>
    )
}
