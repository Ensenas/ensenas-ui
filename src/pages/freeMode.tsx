'use client'

import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'
import styled from 'styled-components'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

import Spinner from '../components/Spinner/Spinner'
import { Container, Overlay, WebcamContainer } from '../components/Recorder/RecorderElements'
import HomeLayout from '../components/HomeLayout/HomeLayout'

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

const ProcessingIndicator = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
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

const DetectedWord = styled.div`
  font-size: 18px;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
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
    const [selectedUnit, setSelectedUnit] = useState('') // Empezar con una unidad vacía
    const [isProcessing, setIsProcessing] = useState(false)
    const [isLoadingUnit, setIsLoadingUnit] = useState(false) // Estado para el spinner de cambio de unidad
    const [lastDetectedWord, setLastDetectedWord] = useState('') // Estado para la última palabra detectada
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)
    const processingRef = useRef(false)
    const lastCaptureTime = useRef(0)
    const animationFrameId = useRef<number | null>(null)

    const socketInitializer = useCallback(() => {

        const newSocket = io(`wss://${process.env.NEXT_PUBLIC_AI_SERVICE_URL}`, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
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
            if (data.word_detected) {
                setLastDetectedWord(data.word_detected) // Actualizar la última palabra detectada
            }
            processingRef.current = false
            setIsProcessing(false)
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

    // Función para enviar la unidad seleccionada al servidor vía HTTP
    const sendUnitSelected = async (unidad: string | undefined) => {
        try {
            setIsLoadingUnit(true) // Activar el spinner de carga
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
            if (response.data.status === "success") {
                setIsLoadingUnit(false) // Desactivar el spinner al recibir éxito
            }
        } catch (error) {
            console.error('Error al seleccionar la unidad:', error)
            setIsLoadingUnit(false) // Desactivar el spinner en caso de error
        }
    }

    const captureAndSendFrame = useCallback(() => {
        const now = performance.now()
        if (now - lastCaptureTime.current < 250) {
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

                const dataURL = canvas.toDataURL('image/jpeg', 0.7)
                socket.emit('video_frame', { image: dataURL })
                processingRef.current = true
                setIsProcessing(true)
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
            await sendUnitSelected(newUnit) // Llamada HTTP para cambiar de unidad
        }
    }, [])

    const unitOptions = useMemo(() => [
        { value: '', label: 'Seleccione una unidad para comenzar' }, // Opción inicial
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
                        <Description>En el modo libre puedes seleccionar una unidad y practicar las señales correspondientes. Selecciona una unidad para comenzar.</Description>
                        <Select value={selectedUnit} onChange={handleUnitChange} disabled={isLoadingUnit}>
                            {unitOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                        <DetectedWord>Última seña detectada: {lastDetectedWord || 'Ninguna'}</DetectedWord>

                        {isLoadingUnit && <Spinner />} {/* Spinner de carga al cambiar de unidad */}
                        {selectedUnit && !isLoadingUnit && ( // Mostrar la cámara solo cuando se seleccione una unidad y no esté cargando
                            <MainImageContainer>
                                <img
                                    ref={outputRef}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
