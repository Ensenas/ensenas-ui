/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { io, Socket } from 'socket.io-client'
import styled from 'styled-components'

import Spinner from '../components/Spinner/Spinner'
import { Container, Overlay, WebcamContainer } from '../components/Recorder/RecorderElements'

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
    const [border, setBorder] = useState('unset')
    const [isConnected, setIsConnected] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState('familiares')
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const newSocket = io('wss://alarma.mywire.org:3050')
        setSocket(newSocket)

        let processingFrame = false

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
            setIsConnected(true)
            setBorder('2px solid #000')
        })

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason)
            setIsConnected(false)
        })

        newSocket.on('processed_frame', (data) => {
            if (processingFrame) return // Ignorar si ya se está procesando otro frame
            processingFrame = true

            if (outputRef.current && data.image) {
                outputRef.current.src = data.image
            }

            processingFrame = false// Ajusta el delay según tu preferencia
        })

        newSocket.emit('unit_selected', { unidad: selectedUnit })
        console.log("Sent unit_selected event to server with unit:", selectedUnit)

        return () => {
            newSocket.disconnect()
            console.log('Socket disconnected:', newSocket.id)
        }
    }, [selectedUnit])

    const sendFrame = useCallback(() => {
        if (webcamRef.current && canvasRef.current && socket) {
            const video = webcamRef.current.video
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (video && context) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

                const dataURL = canvas.toDataURL('image/jpeg', 0.5)
                socket.emit('video_frame', { image: dataURL })
            }
        }
    }, [socket])

    useEffect(() => {
        const interval = setInterval(sendFrame, 250)
        return () => clearInterval(interval)
    }, [sendFrame])

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value as keyof typeof unitWords
        setSelectedUnit(newUnit)
        socket?.emit('unit_selected', { unidad: newUnit })
    }

    return (
        <div>
            {isConnected ? (
                <div>
                    <Container>
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

                        <select value={selectedUnit} onChange={handleUnitChange}>
                            <option value="familiares">Familiares</option>
                            <option value="colores">Colores</option>
                            <option value="pronombres">Pronombres</option>
                            <option value="saludos">Saludos</option>
                            <option value="frases_i">Frases I</option>
                            <option value="frases_ii">Frases II</option>
                        </select>

                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <Overlay />
                    </Container>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}
