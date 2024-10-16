/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import Spinner from '../components/Spinner/Spinner'
import { Container, Overlay, SelectorsContainer, StyledSelect, WebcamContainer } from '../styles/FreeMode.styles'

const unitWords = {
    familiares: ['papa', 'mama', 'hijo', 'hermana'],
    colores: ['amarillo', 'negro', 'rojo', 'verde'],
    pronombres: ["el-ella", "nosotros", "ustedes", "vos", "yo"],
    saludos: ["chau", "hola"],
    frases_i: ["el-ella", "hambre", "medico", "mi", "tener", "trabajar", "yo"],
    frases_ii: ["color", "estudiar", "favorito", "hermana", "mi", "rojo", "universidad"]
}

const FreeMode: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [mode, setMode] = useState('Corregir')
    const [unit, setUnit] = useState('familiares')
    const [border, setBorder] = useState('unset')
    const [isConnected, setIsConnected] = useState(false)
    const [reset, setReset] = useState(false)
    const [selectedWord, setSelectedWord] = useState(unitWords.familiares[0])
    const [fps, setFps] = useState(0)
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const newSocket = io('wss://alarma.mywire.org:3050')

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
            setIsConnected(true)
            setBorder('2px solid #000')
        })

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason)
        })
        newSocket.on('processed_frame', (data) => {
            if (outputRef.current) {
                outputRef.current.src = data.image
            }
        })
        setSocket(newSocket)
        newSocket.emit('unit_selected', { unidad: unit })

        const handleKeyPress = (event) => {

            if (event.keyCode === 13) {
                setReset(true)
                setBorder('3px solid #039619')
            }
        }

        document.addEventListener('keydown', handleKeyPress)


        return () => {
            newSocket.disconnect()
            document.removeEventListener('keydown', handleKeyPress)
            console.log('Socket disconnected:', newSocket.id)
        }
    }, [])

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
                    socket.emit('video_frame', { image: dataURL, reset: reset })
                    setReset(false)
                }
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(sendFrame, 250)
        return () => clearInterval(interval)
    }, [socket, sendFrame])

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value as keyof typeof unitWords
        setUnit(newUnit)
        setSelectedWord(unitWords[newUnit][0])
        socket?.emit('unit_selected', { unidad: newUnit })
    }

    const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMode = e.target.value
        setMode(newMode)
        socket?.emit('reset_text')
    }

    const handleWordChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWord(e.target.value)
        socket?.emit('reset_text')
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage='/freeMode'>
                {isConnected ? (
                    <div>
                        <Container>
                            <div id="fpsDisplay">FPS Max: {fps}</div>

                            <SelectorsContainer>
                                <StyledSelect value={unit} onChange={handleUnitChange}>
                                    <option value="familiares">Familiares</option>
                                    <option value="colores">Colores</option>
                                </StyledSelect>

                            </SelectorsContainer>

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
                                    style={{ opacity: 0 }}
                                />
                            </WebcamContainer>

                            <canvas ref={canvasRef} style={{ display: 'none' }} />

                            <Overlay />
                        </Container>
                    </div>
                ) : (
                    <Spinner />
                )}
            </HomeLayout>
        </ProtectedRoute>
    )
}

export default FreeMode