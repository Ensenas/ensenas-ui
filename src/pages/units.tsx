// pages/myLearning/levels/[levelId].tsx

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ProtectedRoute from '../components/ProtectedRoute'
import {
    UnitCard,
    Section,
    Title
} from '../styles/Learning.styles'

const LevelUnits: React.FC = () => {
    const router = useRouter()
    const { levelId } = router.query
    const [units, setUnits] = useState<any[]>([])

    /*
    useEffect(() => {
      if (levelId) {
        // Simula una llamada al backend para obtener las unidades del nivel
        fetch(`/api/levels/${levelId}/units`)
          .then(response => response.json())
          .then(data => setUnits(data))
          .catch(error => console.error('Error fetching units:', error))
      }
    }, [levelId])
  */

    useEffect(() => {
        // Simula una llamada al backend para obtener los niveles
        const mockUnits = [
            { id: 1, title: 'Unidad 1: A' },
            { id: 2, title: 'Unidad 2: B' },
            { id: 3, title: 'Unidad 3: C' }
        ]

        // Simula un pequeño retraso para imitar la llamada a una API
        setTimeout(() => {
            setUnits(mockUnits)
        }, 500) // Retraso de 500ms
    }, [])

    return (
        <ProtectedRoute>
            <Section>
                <Title>Unidades del Nivel</Title>
                <div>
                    {units.map(unit => (
                        <Link key={unit.id} href={`/myLearning/levels/${levelId}/units/${unit.id}`} passHref>
                            <UnitCard>
                                <h3>{unit.title}</h3>
                            </UnitCard>
                        </Link>
                    ))}
                </div>
            </Section>
        </ProtectedRoute>
    )
}

export default LevelUnits
