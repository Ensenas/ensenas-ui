import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

import { Container,Overlay,RecordButton,WebcamContainer } from './RecorderElements'


export default function WebcamVideo() {
    const webcamRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [capturing, setCapturing] = useState(false)
    const [recordedChunks, setRecordedChunks] = useState([])
    console.log('recorderchunks', recordedChunks)

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks(data)
            }
        },
        [setRecordedChunks]
    )

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true)
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: 'video/webm'
        })
        mediaRecorderRef.current.addEventListener(
            'dataavailable',
            handleDataAvailable
        )
        mediaRecorderRef.current.start()
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable])

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop()
        setCapturing(false)
    }, [mediaRecorderRef, setCapturing])

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'
            })
            const url = URL.createObjectURL(blob)
            // const a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style = "display: none";
            // a.href = url;
            // a.download = "react-webcam-stream-capture.webm";
            // a.click();
            // window.URL.revokeObjectURL(url);
            setRecordedChunks([])
        }
    }, [recordedChunks])

    const videoConstraints = {
        width: 1400, // Ajusta el ancho
        height: 1400, // Ajusta la altura
        facingMode: 'user'
    }

    return (
        <Container>
            <WebcamContainer>
                <Webcam
                    audio={false}
                    mirrored={true}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    style={{ borderRadius: '15px' }} // Añade bordes redondeados a la cámara
                
                />
            </WebcamContainer>
            {capturing ? (
                <RecordButton onClick={handleStopCaptureClick}>Finalizar</RecordButton>
            ) : (
                <RecordButton onClick={handleStartCaptureClick}>Empezar</RecordButton>
            )}

            <Overlay />
        </Container>
    )
}