'use client'

import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Container, WebcamContainer, Overlay } from './RecorderElements'
import Webcam from 'react-webcam'
import { Lesson, Unit, useNavigation } from '../../context/NavigationLearningContext'

const unitWords = {
    familiares: ['papa', 'mama', 'hijo', 'hermana'],
    colores: ['amarillo', 'negro', 'rojo', 'verde']
}

export default function VideoStreamRemoto() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [fps, setFps] = useState(0)
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson, setTest } = useNavigation()
  

    useEffect(() => {
        const newSocket = io('wss://alarma.mywire.org:3051');
        
        newSocket.on('connect', () => {
            console.log("Socket connected:", newSocket.id);
        });

        newSocket.on('disconnect', (reason) => {
            console.log("Socket disconnected:", reason);
        });

        newSocket.on('processed_frame', (data) => {
            console.log('Received processed frame:', data);
            setFps((1 / data.total_time_time));
            if (outputRef.current) {
                outputRef.current.src = data.image;
            }
        });

        setSocket(newSocket);
        console.log('New Socket', newSocket)
        console.log('New Socket active', newSocket.active)
        console.log('Socket', socket)

        return () => {
            newSocket.disconnect();
            console.log("Socket disconnected:", newSocket.id);
        };
    }, []);

    const sendFrame = () => {
        if (webcamRef.current && canvasRef.current) {
            const video = webcamRef.current.video;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (video && context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

                const dataURL = canvas.toDataURL('image/jpeg', 0.5);
                if (socket) {
                    console.log("Sending frame:");
                    const unit: string | undefined = findUnit();
                    const word: string | undefined = findWord();
                    console.log('UNIT', unit)
                    console.log('WORD', word)
                    socket.emit('unit_selected', { unidad: unit });
                    socket.emit('corregir_video_stream', { palabra: word, image: dataURL });
                }
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(sendFrame, 250);
        return () => clearInterval(interval);
    }, [socket])

    const findUnit = () : string | undefined => {
        if(currentUnit){
            return currentUnit.description.split(':').pop()?.trim().toLowerCase();
        }
        
    }
    const findWord = () : string | undefined => {
        console.log(currentLesson)
        if(currentLesson && currentLesson.title){
            return currentLesson.description.split(':').pop()?.trim().toLowerCase();
        }
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
        <Container>
            <div id="fpsDisplay">FPS Max: {fps}</div>

            {/* <div id="selectors-container">
                <select value={unit} onChange={handleUnitChange}>
                    <option value="familiares">Familiares</option>
                    <option value="colores">Colores</option>
                </select>
                <select value={mode} onChange={handleModeChange}>
                    <option value="Detectar">Detectar</option>
                    <option value="Corregir">Corregir</option>
                </select>
                {mode === 'Corregir' && (
                    <select value={selectedWord} onChange={handleWordChange}>
                        {unitWords[unit as keyof typeof unitWords].map((word) => (
                            <option key={word} value={word}>{word}</option>
                        ))}
                    </select>
                )}
            </div> */}

            <img ref={outputRef} alt="Processed Video Stream" style={{ width: '80%', border: '2px solid #000' }} />

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
    );
}
