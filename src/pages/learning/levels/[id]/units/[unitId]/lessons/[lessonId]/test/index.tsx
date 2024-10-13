/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react';

import HomeLayout from '../../../../../../../../../components/HomeLayout/HomeLayout';
import ProtectedRoute from '../../../../../../../../../components/ProtectedRoute';
import VideoStreamRemoto from '../../../../../../../../../components/Recorder/VideoStreamRemoto';
import { useNavigation } from '../../../../../../../../../context/NavigationLearningContext';
import {
    InstructionText,
    LessonTitle, Section, Title
} from '../../../../../../../../../styles/test.styles'


interface LessonProps {
    currentLevel: number | null;
    currentUnit: number | null;
    currentLesson: number | null;
    setTest: (test: Boolean) => void;
}

const LessonTest: React.FC<LessonProps> = () => {
    const { currentLevel, currentUnit, currentLesson } = useNavigation();

    useEffect(() => {
        // Iniciar el challenge cuando se cargue la lección
        if (currentLesson) {
            updateChallengeProgress('start');
        }
    }, [currentLesson]);

    // Función para enviar solicitud al backend y actualizar el progreso del challenge
    const updateChallengeProgress = async (action: 'start' | 'complete') => {
        if (!currentLesson) return;

        // Obtener el token JWT del localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No se encontró el token JWT, el usuario no está autenticado.');
            return;
        }

        try {
            const response = await axios.post(
                '/ens-api/users/complete-challenge',
                {
                    challengeId: currentLesson.id.toString(),
                    result: action === 'complete' // Si es "complete", el resultado es true
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado
                    },
                }
            );
            console.log(`${action} challenge progress response:`, response.data);
        } catch (error) {
            console.error(`Error while trying to ${action} challenge:`, error);
        }
    };

    // Callback para manejar la finalización del challenge
    const handleChallengeComplete = () => {
        updateChallengeProgress('complete');
    };

    return (
        <ProtectedRoute>
            <HomeLayout activePage={`/learning`}>
                <Section>
                    <Title>{currentLesson?.title}</Title>
                    <LessonTitle>
                        Deberás realizar con sus manos la siguiente seña:
                        <div style={{ color: '#0567b1', marginLeft: 10 }}>{currentLesson?.description}</div>
                    </LessonTitle>
                    <InstructionText>Para reintentar, presioná la tecla Enter.</InstructionText>
                    <InstructionText>
                        Es necesario que para la realización de la seña se encuentre sentado,
                        con una distancia de aproximadamente 2 metros de la cámara de manera que se vea hasta la mitad del torso.
                    </InstructionText>

                    {/* Agregar callback para cuando el desafío sea completado */}
                    <VideoStreamRemoto level={currentLevel} unit={currentUnit} lesson={currentLesson} onComplete={handleChallengeComplete} />
                </Section>
            </HomeLayout>
        </ProtectedRoute>
    );
};

export default LessonTest;
