/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import axios from 'axios'
import React, { createContext, ReactNode,useContext, useEffect, useState } from 'react'

export interface Level {
  id: number,
  title: string,
  description: string
}

export interface Unit {
  id: number,
  title: string,
  description: string,
  order: number
}

export interface Lesson {
  id: number,
  title: string,
  description: string,
  order: number,
  videoSrc: string
}


interface NavigationLearningContextType {
  currentLevel: Level | null;
  setCurrentLevel: (level: Level | null) => void;
  currentUnit: Unit | null;
  setCurrentUnit: (unit: Unit | null) => void;
  currentLesson: Lesson | null;
  setCurrentLesson: (lessons: Lesson | null) => void;
  levels : [Level] | null;
  setLevels: (lessons: [Level] | null) => void;
  units : [Unit] | null;
  setUnits: (lessons: [Unit] | null) => void;
  lessons : [Lesson] | null;
  setLessons: (lessons: [Lesson] | null) => void;
  isLoading: boolean | null;
  setIsLoading: (loading: boolean | null) => void;
  hasShownModal: boolean | null;
  setHasShownModal: (hsm: boolean | null) => void;
  test: boolean | null;
  setTest: (test: boolean | null) => void;
}

const NavigationLearningContext = createContext<NavigationLearningContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

    const [currentLevel, setCurrentLevel] = useState<Level | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('currentLevel') || 'null') : null
    })

    const [currentUnit, setCurrentUnit] = useState<Unit | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('currentUnit') || 'null') : null
    })

    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('currentLesson') || 'null') : null
    })

    const [levels, setLevels] = useState<[Level] | null>(() => {
      return isBrowser ? JSON.parse(localStorage.getItem('levels') || 'null') : null
    })

    const [units, setUnits] = useState<[Unit] | null>(() => {
      return isBrowser ? JSON.parse(localStorage.getItem('units') || 'null') : null
    })

    const [lessons, setLessons] = useState<[Lesson] | null>(() => {
      return isBrowser ? JSON.parse(localStorage.getItem('lessons') || 'null') : null
    })

    const [isLoading, setIsLoading] = useState<boolean | null>(() => {
      return isBrowser ? JSON.parse(localStorage.getItem('isLoading') || 'null') : null
    })


    const [hasShownModal, setHasShownModal] = useState<boolean | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('hasShownModal') || 'null') : null
    })

    const [test, setTest] = useState<boolean | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('test') || 'null') : null
    })
    
    useEffect(() => {
    // Guarda el estado en localStorage cada vez que cambie
    localStorage.setItem('currentLevel', JSON.stringify(currentLevel))
    localStorage.setItem('currentUnit', JSON.stringify(currentUnit))
    localStorage.setItem('currentLesson', JSON.stringify(currentLesson))
    localStorage.setItem('levels', JSON.stringify(levels))
    localStorage.setItem('levels', JSON.stringify(units))
    localStorage.setItem('lessons', JSON.stringify(lessons))
    localStorage.setItem('loading', JSON.stringify(isLoading))
    localStorage.setItem('hasShownModal', JSON.stringify(hasShownModal))
    localStorage.setItem('test', JSON.stringify(test))
    }, [currentLevel, currentUnit, currentLesson, hasShownModal, levels, units, lessons, isLoading, test])
    

    useEffect(() => {
      const fetchLevels = async () => {
        try {
          const response = await axios.get('/ens-api/common/paths')
          const levelList = response.data.map((level: any) => ({
            id: level.id,
            title: level.title,
            description: level.description
          }))
          console.log(levelList)
          levelList.sort((a, b) => b.id - a.id)
          console.log(levelList)
          setLevels(levelList)
        } catch (error) {
          console.error('Error fetching levels:', error)
        } finally {
          setIsLoading(false) // Termina la carga, incluso si hay error
        }
      }
      fetchLevels()
    }, [])

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
              setUnits(unitsList)
          } catch (error) {
              console.error('Error fetching units:', error)
          } finally {
              setIsLoading(false) // Termina la carga, incluso si hay error
          }
      }
      fetchUnits()
  }, [currentLevel])

    useEffect(() => {
      const fetchLessons = async () => {
          try {
              const response = await axios.get('/ens-api/lessons')
              console.log('DATA', response.data)
              const lessonsList = response.data.map((lesson: any) => ({
                  id: lesson.id,
                  title: lesson.title,
                  description: lesson.description,
                  order: lesson.order,
                  videoSrc: `https://ensenas-videos.s3.us-west-1.amazonaws.com/${getFirstPartString(lesson.description)}/${getSecondPartString(lesson.description)}.mp4`
              }))
              lessonsList.sort((a, b) => a.order < b.order)
              setLessons(lessonsList)
          } catch (error) {
              console.error('Error fetching lessons:', error)
          } finally {
              setIsLoading(false) // Termina la carga, incluso si hay error
          }
      }
      fetchLessons()
  }, [currentLevel])

  const getFirstPartString = (string: string): string | undefined => {
    return string.split(':')[0]?.trim().toLowerCase()
  }
  
  const getSecondPartString = (string: string): string | undefined => {
    return string.split(':')[1]?.trim().toLowerCase()
  }

  return (
    <NavigationLearningContext.Provider
      value={{ currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson, 
        levels, setLevels, units, setUnits, lessons, setLessons, 
        isLoading, setIsLoading, hasShownModal, setHasShownModal, test, setTest }}
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
