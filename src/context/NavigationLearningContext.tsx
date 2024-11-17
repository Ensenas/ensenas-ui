'use client'

import axios from 'axios'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface Level {
  id: number
  title: string
  description: string
}

export interface Unit {
  id: number
  title: string
  description: string
  order: number
}

export interface Lesson {
  id: number
  title: string
  description: string
  detailedDescription: string
  order: number
  completed?: boolean
  videoSrc: string
}

interface Challenge {
  id: number
  description: string
  video: string
  title: string
}

interface UserChallengeProgress {
  id: string
  challenge: Challenge
  started: boolean
  completed: boolean
}

interface NavigationLearningContextType {
  authToken: string | null
  setAuthToken: (_: string | null) => void
  currentLevel: Level | null
  setCurrentLevel: (_: Level | null) => void
  currentUnit: Unit | null
  setCurrentUnit: (_: Unit | null) => void
  currentLesson: Lesson | null
  setCurrentLesson: (_: Lesson | null) => void
  levels: Level[] | null
  setLevels: (_: Level[] | null) => void
  units: Unit[] | null
  setUnits: (_: Unit[] | null) => void
  lessons: Lesson[] | null
  setLessons: (_: Lesson[] | null) => void
  isLoading: boolean
  setIsLoading: (_: boolean) => void
  hasShownModal: boolean
  setHasShownModal: (_: boolean) => void
  test: boolean
  setTest: (_: boolean) => void
  userProgress: UserChallengeProgress[] | null
  setUserProgress: (_: UserChallengeProgress[] | null) => void
  handleLogout: () => void
}

const NavigationLearningContext = createContext<NavigationLearningContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

  const [authToken, setAuthToken] = useState<string | null>(() => {
    return isBrowser ? localStorage.getItem('authToken') || null : null
  })

  const [currentLevel, setCurrentLevel] = useState<Level | null>(() => {
    return isBrowser ? JSON.parse(localStorage.getItem('currentLevel') || 'null') : null
  })

  const [currentUnit, setCurrentUnit] = useState<Unit | null>(() => {
    return isBrowser ? JSON.parse(localStorage.getItem('currentUnit') || 'null') : null
  })

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(() => {
    return isBrowser ? JSON.parse(localStorage.getItem('currentLesson') || 'null') : null
  })

  const [levels, setLevels] = useState<Level[] | null>(() => {
    return isBrowser ? JSON.parse(localStorage.getItem('levels') || 'null') : null
  })

  const [units, setUnits] = useState<Unit[] | null>(() => {
    return isBrowser ? JSON.parse(localStorage.getItem('units') || 'null') : null
  })

  const [lessons, setLessons] = useState<Lesson[] | null>(() => {
    return isBrowser ? JSON.parse(localStorage.getItem('lessons') || 'null') : null
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasShownModal, setHasShownModal] = useState<boolean>(false)
  const [test, setTest] = useState<boolean>(false)
  const [userProgress, setUserProgress] = useState<UserChallengeProgress[] | null>(null)


  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken)
    } else {
      localStorage.removeItem('authToken')
    }
  }, [authToken])

  useEffect(() => {
    localStorage.setItem('currentLevel', JSON.stringify(currentLevel))
    localStorage.setItem('currentUnit', JSON.stringify(currentUnit))
    localStorage.setItem('currentLesson', JSON.stringify(currentLesson))
    localStorage.setItem('levels', JSON.stringify(levels))
    localStorage.setItem('units', JSON.stringify(units))
    localStorage.setItem('lessons', JSON.stringify(lessons))
  }, [currentLevel, currentUnit, currentLesson, levels, units, lessons])

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get('/ens-api/common/paths')
        const levelList = response.data.map((level: any) => ({
          id: level.id,
          title: level.title,
          description: level.description
        }))
        levelList.sort((a: Level, b: Level) => b.id - a.id)
        setLevels(levelList)
      } catch (error) {
        console.error('Error fetching levels:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLevels()
  }, [])

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('/ens-api/units')
        const unitsList = response.data.map((unit: any) => ({
          id: unit.id,
          title: unit.title,
          description: unit.description,
          order: unit.order
        }))
        unitsList.sort((a: Unit, b: Unit) => a.order - b.order)
        setUnits(unitsList)
      } catch (error) {
        console.error('Error fetching units:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUnits()
  }, [currentLevel])

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get('/ens-api/lessons')
        const lessonsList = response.data.map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          detailedDescription: lesson.detailedDescription,
          order: lesson.order,
          videoSrc: `https://ensenas-videos.s3.us-west-1.amazonaws.com/${getFirstPartString(lesson.description)}` +
            `/${getSecondPartString(lesson.description)}.mp4`
        }))
        lessonsList.sort((a: Lesson, b: Lesson) => a.order - b.order)
        setLessons(lessonsList)
      } catch (error) {
        console.error('Error fetching lessons:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLessons()
  }, [currentLevel])

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!authToken) {
        console.error('No se encontró el token JWT, el usuario no está autenticado.')
        setUserProgress(null)
        return
      }

      try {
        const response = await axios.get('/ens-api/users/challenge-progress', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0'
          }
        })
        setUserProgress(response.data)
      } catch (error) {
        console.error('Error al obtener el progreso del desafío:', error)
        setUserProgress(null)
      }
    }

    fetchUserProgress()
  }, [authToken])

  const getFirstPartString = (string: string): string => {
    return string.split(':')[0]?.trim().toLowerCase() || ''
  }

  const getSecondPartString = (string: string): string => {
    return string.split(':')[1]?.trim().toLowerCase() || ''
  }

  const clearUserData = () => {
    setCurrentLevel(null)
    setCurrentUnit(null)
    setCurrentLesson(null)
    setUserProgress(null)
  }

  const handleLogout = () => {
    setAuthToken(null)
    clearUserData()
  }

  return (
    <NavigationLearningContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        currentUnit,
        setCurrentUnit,
        currentLesson,
        setCurrentLesson,
        levels,
        setLevels,
        units,
        setUnits,
        lessons,
        setLessons,
        isLoading,
        setIsLoading,
        hasShownModal,
        setHasShownModal,
        test,
        setTest,
        userProgress,
        setUserProgress,
        authToken,
        setAuthToken,
        handleLogout
      }}
    >
      {children}
    </NavigationLearningContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationLearningContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}