'use client'

import axios from 'axios'
import React, { useCallback, useEffect, useMemo,useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'
import styled, { keyframes } from 'styled-components'

// Componentes internos de la aplicación
import HomeLayout from '../components/HomeLayout/HomeLayout'
import { Container, Overlay } from '../components/Recorder/RecorderElements'
import Spinner from '../components/Spinner/Spinner'

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

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
`

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`

const popAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`

const DetectedWord = styled.div<{ animate: boolean }>`
  font-size: 32px;
  color: #333;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  transition: color 0.3s ease;
  animation: ${({ animate }) => (animate ? popAnimation : 'none')} 0.5s ease;
`

const unitWords = {
    familiares: ['papa', 'mama', 'hijo', 'hermana'],
    colores: ['amarillo', 'negro', 'rojo', 'verde'],
    pronombres: ['el-ella', 'nosotros', 'ustedes', 'vos', 'yo'],
    saludos: ['chau', 'hola'],
    frases_i: ['el-ella', 'hambre', 'medico', 'mi', 'tener', 'trabajar', 'yo'],
    frases_ii: ['color', 'estudiar', 'favorito', 'hermana', 'mi', 'rojo', 'universidad']
}

export default function VideoStreamRemoto() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState('')
    const [isLoadingUnit, setIsLoadingUnit] = useState(false)
    const [lastDetectedWord, setLastDetectedWord] = useState('')
    const [animateWord, setAnimateWord] = useState(false)
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)
    const processingRef = useRef(false)
    const lastCaptureTime = useRef(0)
    const animationFrameId = useRef<number | null>(null)
    const previousWordRef = useRef('') // Para almacenar la última palabra detectada

    const socketInitializer = useCallback(() => {
        const newSocket = io(`wss://${process.env.NEXT_PUBLIC_AI_SERVICE_URL}`, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        })
        setSocket(newSocket)

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
            setIsConnected(true)
        })

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason)
            setIsConnected(false)
        })

        newSocket.on('processed_frame', (data) => {
            if (outputRef.current && data.image) {
                outputRef.current.src = data.image
            }
            if (data.word_detected && data.word_detected !== previousWordRef.current) {
                setLastDetectedWord(data.word_detected)
                previousWordRef.current = data.word_detected
                setAnimateWord(true)
            }
            processingRef.current = false
        })

        return () => {
            newSocket.disconnect()
            console.log('Socket disconnected:', newSocket.id)
        }
    }, [])

    useEffect(() => {
        const cleanup = socketInitializer()
        return cleanup
    }, [socketInitializer])

    useEffect(() => {
        if (animateWord) {
            const timer = setTimeout(() => setAnimateWord(false), 500)
            return () => clearTimeout(timer)
        }
    }, [animateWord])

    const sendUnitSelected = async (unidad: string | undefined) => {
        try {
            setIsLoadingUnit(true)
            const response = await axios.post(
                `https://${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/unit_selected`,
                { unidad },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log('Respuesta del servidor:', response.data)
            if (response.data.status === 'success') {
                setIsLoadingUnit(false)
            }
        } catch (error) {
            console.error('Error al seleccionar la unidad:', error)
            setIsLoadingUnit(false)
        }
    }

    const captureAndSendFrame = useCallback(() => {
        const now = performance.now()
        if (now - lastCaptureTime.current < 150) {
            animationFrameId.current = requestAnimationFrame(captureAndSendFrame)
            return
        }

        if (webcamRef.current && canvasRef.current && socket && !processingRef.current) {
            const video = webcamRef.current.video
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (video && context) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

                const dataURL = canvas.toDataURL('image/jpeg', 0.5)
                socket.emit('video_frame', { image: dataURL })
                processingRef.current = true
                lastCaptureTime.current = now
            }
        }

        animationFrameId.current = requestAnimationFrame(captureAndSendFrame)
    }, [socket])

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(captureAndSendFrame)
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [captureAndSendFrame])

    const handleUnitChange = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value as keyof typeof unitWords
        setSelectedUnit(newUnit)
        if (newUnit) {
            await sendUnitSelected(newUnit)
        }
    }, [])

    const unitOptions = useMemo(() => [
        { value: '', label: 'Seleccione una unidad para comenzar' },
        { value: 'familiares', label: 'Familiares' },
        { value: 'colores', label: 'Colores' },
        { value: 'pronombres', label: 'Pronombres' },
        { value: 'saludos', label: 'Saludos' },
        { value: 'frases_i', label: 'Frases I' },
        { value: 'frases_ii', label: 'Frases II' }
    ], [])

    return (
        <div>
            {isConnected ? (
                <HomeLayout activePage={'/freeMode'}>
                    <Container>
                        <Title>Modo Libre</Title>
                        <Description>En el modo libre puedes seleccionar una unidad y practicar las señales correspondientes.
                            Selecciona una unidad para comenzar.</Description>
                        <Select value={selectedUnit} onChange={handleUnitChange} disabled={isLoadingUnit}>
                            {unitOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                        <DetectedWord animate={animateWord}>
                            Última seña detectada: {lastDetectedWord ||
                                'Ninguna'}
                        </DetectedWord>

                        {isLoadingUnit && <Spinner />}
                        {selectedUnit && !isLoadingUnit && (
                            <MainImageContainer>
                                <img
                                    ref={outputRef}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt='Processed output'
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
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <Overlay />
                    </Container>
                </HomeLayout>
            ) : (
                <Spinner />
            )}
        </div>
    )
}
