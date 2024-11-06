'use client'

import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'
import styled from 'styled-components'
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
    const [selectedUnit, setSelectedUnit] = useState('familiares')
    const [isProcessing, setIsProcessing] = useState(false)
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)
    const processingRef = useRef(false)
    const lastCaptureTime = useRef(0)
    const animationFrameId = useRef<number | null>(null)

    const socketInitializer = useCallback(() => {
        const newSocket = io('wss://alarma.mywire.org:3050', {
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

    useEffect(() => {
        if (socket) {
            socket.emit('unit_selected', { unidad: selectedUnit })
        }
    }, [selectedUnit, socket])

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

    const handleUnitChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value as keyof typeof unitWords
        setSelectedUnit(newUnit)
        socket?.emit('unit_selected', { unidad: newUnit })
    }, [socket])

    const unitOptions = useMemo(() => [
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
                        <select value={selectedUnit} onChange={handleUnitChange}>
                            {unitOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <MainImageContainer>
                            <img
                                ref={outputRef}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="Processed output"
                            />
                            {/* {isProcessing && (
                                <ProcessingIndicator>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </ProcessingIndicator>
                            )} */}
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