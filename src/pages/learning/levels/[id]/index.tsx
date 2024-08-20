import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '../../../../components/ProtectedRoute'
import LoadingSpinner from '../../../../components/Spinner/Spinner'
import {
    Section,
    Title,
    UnitCard
} from '../../../../styles/Learning.styles'

interface LevelUnitsProps {
    currentLevel: number;
    setCurrentUnit: (unitId: number) => void;
}

const LevelUnits: React.FC<LevelUnitsProps> = ({ currentLevel, setCurrentUnit }) => {
    const [units, setUnits] = useState<any[]>([])
    const [allUnits, setAllUnits] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log(currentLevel)
        const fetchUnits = async () => {
            try {
                const response = await axios.get('/ens-api/units')
                const unitsList = response.data.map((unit: any) => ({
                    id: unit.id,
                    title: unit.title,
                    description: unit.description,
                    order: unit.order
                }))
                unitsList.sort((a, b) => a.order < b.order)
                setAllUnits(unitsList)
            } catch (error) {
                console.error('Error fetching units:', error)
            } finally {
                setIsLoading(false) // Termina la carga, incluso si hay error
            }
        }
        fetchUnits()
    }, [])


    useEffect(() => {
        console.log('levels', currentLevel)
        if (currentLevel) {
            let filteredUnits: any[] = []
            switch (currentLevel) {
                case 2:
                    console.log('Paso por E')
                    filteredUnits = allUnits.filter(unit => unit.title.startsWith('E'))
                    console.log('allUnits ', allUnits)
                    console.log('filteredUnits', filteredUnits)
                    break
                case 3:
                    filteredUnits = allUnits.filter(unit => unit.title.startsWith('I'))
                    break
                case 4:
                    filteredUnits = allUnits.filter(unit => unit.title.startsWith('B'))
                    break

            }
            console.log(filteredUnits)
            setUnits(filteredUnits)
        }
    }, [currentLevel, allUnits])

    const handleUnitClick = (unitId: number) => {
        setCurrentUnit(unitId) // Actualiza el estado de la unidad actual
    }

    return (
        <ProtectedRoute>
            <Section>
                <Title>Unidades del Nivel</Title>
                <div>
                    {isLoading ? (
                        <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                    ) : (
                        units.map(unit => (
                            <div key={unit.id} onClick={() => handleUnitClick(unit.id)}>
                                <UnitCard>
                                    <h1>{unit.title}</h1>
                                    <h3>{unit.description}</h3>
                                </UnitCard>
                            </div>
                        )))}
                </div>
            </Section>
        </ProtectedRoute>
    )
}

export default LevelUnits