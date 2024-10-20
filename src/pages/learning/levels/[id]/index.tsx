/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../../../../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../components/Spinner/Spinner'
import { Unit, useNavigation } from '../../../../context/NavigationLearningContext'
import {
    BackButton,
    Section,
    Title,
    UnitCard
} from '../../../../styles/Learning.styles'

const LevelUnits: React.FC = ({ }) => {
    const [filteredUnits, setFilteredUnits] = useState<Unit[]>()
    const [lastSelectedUnit, setLastSelectedUnit] = useState<string | null>(null) // Estado para la última unidad seleccionada
    const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
        units, isLoading
    } = useNavigation()

    useEffect(() => {
        if (currentLevel) {
            switch (currentLevel.id) {
                case 3:
                    setFilteredUnits(units?.filter(unit => unit.title.startsWith('B')))
                    break
                case 2:
                    setFilteredUnits(units?.filter(unit => unit.title.startsWith('I')))
                    console.log(units)
                    break
                case 1:
                    setFilteredUnits(units?.filter(unit => unit.title.startsWith('A')))
                    console.log(units)
                    break
            }
        }
    }, [currentLevel, units])

    // Función para enviar la unidad seleccionada al backend
    const sendUnitSelected = async (unidad: string | undefined) => {
        try {
            const response = await axios.post(
                'https://alarma.mywire.org:3050/unit_selected',
                { unidad },
                {
                    headers: {
                        'Content-Type': 'application/json'  // Encabezado para JSON
                    }
                }
            )
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al seleccionar la unidad:', error)
        }
    }

    const handleUnitClick = (unit: Unit) => {
        if (!currentUnit || unit.title !== lastSelectedUnit) {
            // Si la unidad es diferente a la última seleccionada, hacer la solicitud POST

            sendUnitSelected(unit.description.split(':').pop()?.trim().toLowerCase().replace(' ', '_'))
            setLastSelectedUnit(unit.title) // Actualizar la última unidad seleccionada
        }
        setCurrentUnit(unit) // Actualiza el estado de la unidad actual
        router.push(`/learning/levels/${currentLevel?.description}/units/${unit.description}`)
    }

    const handleGoBack = () => {
        setCurrentLevel(null)
        router.push('/learning')
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={'/learning'}>
                <Section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title>Unidades del Nivel</Title>
                        <BackButton onClick={handleGoBack}>
                        Volver atrás
                        </BackButton>
                    </div>
                    <div>
                        {isLoading ? (
                            <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                        ) : (
                            filteredUnits?.map(unit => (
                                <div key={unit.id} onClick={() => handleUnitClick(unit)}>
                                    <UnitCard>
                                        <h1>{unit.description}</h1>
                                        <h3>{unit.title}</h3>
                                    </UnitCard>
                                </div>
                            )))}
                    </div>
                </Section>
            </HomeLayout>
        </ProtectedRoute>
    )
}

export default LevelUnits
