'use client'

import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Container, WebcamContainer, Overlay, SelectorsContainer, StyledSelect } from '../styles/FreeMode.styles'
import Webcam from 'react-webcam'
import ProtectedRoute from '../components/ProtectedRoute'
import HomeLayout from '../components/HomeLayout/HomeLayout'

const unitWords = {
    familiares: ['papa', 'mama', 'hijo', 'hermana'],
    colores: ['amarillo', 'negro', 'rojo', 'verde']
}

const FreeMode : React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [mode, setMode] = useState('Corregir')
    const [unit, setUnit] = useState('familiares')
    const [selectedWord, setSelectedWord] = useState(unitWords.familiares[0])
    const [fps, setFps] = useState(0)
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const outputRef = useRef<HTMLImageElement>(null)

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
                    socket.emit('video_frame', { palabra: selectedWord, image: dataURL });
                }
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(sendFrame, 250);
        return () => clearInterval(interval);
    }, [socket]);

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value as keyof typeof unitWords;
        setUnit(newUnit);
        setSelectedWord(unitWords[newUnit][0]);
        socket?.emit('unit_selected', { unidad: newUnit });
    }

    const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMode = e.target.value;
        setMode(newMode);
        socket?.emit('reset_text');
    }

    const handleWordChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWord(e.target.value);
        socket?.emit('reset_text');
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage='/freeMode'>
                <Container>
                    <div id="fpsDisplay">FPS Max: {fps}</div>

                    <SelectorsContainer>
                        <StyledSelect value={unit} onChange={handleUnitChange}>
                            <option value="familiares">Familiares</option>
                            <option value="colores">Colores</option>
                        </StyledSelect>

                    </SelectorsContainer>

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
                            style={{opacity: 0}}
                        />
                    </WebcamContainer>

                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    
                    <Overlay />
                </Container>
            </HomeLayout>
        </ProtectedRoute>
    );
}

export default FreeMode