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
    Section,
    Title,
    UnitCard
} from '../../../../styles/Learning.styles'

const LevelUnits: React.FC = ({ }) => {
    const [filteredUnits, setFilteredUnits] = useState<Unit[]>()
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

    const handleUnitClick = (unit: Unit) => {
        setCurrentUnit(unit) // Actualiza el estado de la unidad actual
        router.push(`/learning/levels/${currentLevel?.description}/units/${unit.description}`)
    }

    return (
        <ProtectedRoute>
            <HomeLayout activePage={`/learning`}>
                <Section>
                    <Title>Unidades del Nivel</Title>
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