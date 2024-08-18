import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '../../../../components/ProtectedRoute'
import {
    UnitCard,
    Section,
    Title
} from '../../../../styles/Learning.styles'
import axios from 'axios';

interface LevelUnitsProps {
    currentLevel: number;
    setCurrentUnit: (unitId: number) => void;
}

const LevelUnits: React.FC<LevelUnitsProps> = ({ currentLevel, setCurrentUnit }) => {
    const [units, setUnits] = useState<any[]>([])
    const [allUnits, setAllUnits] = useState<any[]>([])

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
                    filteredUnits = allUnits.filter(unit => unit.title.startsWith('E'))
                    break
                case 3:
                    filteredUnits = allUnits.filter(unit => unit.title.startsWith('I'))
                    break
                case 4:
                    filteredUnits = allUnits.filter(unit => unit.title.startsWith('B'))
                    break

            }
            setUnits(filteredUnits)
        }
    }, [currentLevel])

    const handleUnitClick = (unitId: number) => {
        setCurrentUnit(unitId) // Actualiza el estado de la unidad actual
    }

    return (
        <ProtectedRoute>
            <Section>
                <Title>Unidades del Nivel</Title>
                <div>
                    {units.map(unit => (
                        <div key={unit.id} onClick={() => handleUnitClick(unit.id)}>
                            <UnitCard>
                                <h1>{unit.id}</h1>
                                <h3>{unit.title}</h3>
                                <h5>{unit.description}</h5>
                                <h6>{unit.order}</h6>
                            </UnitCard>
                        </div>
                    ))}
                </div>
            </Section>
        </ProtectedRoute>
    )
}

export default LevelUnits