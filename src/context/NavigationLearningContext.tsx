/* eslint-disable no-unused-vars */
// context/NavigationContext.tsx
import React, { createContext, ReactNode,useContext, useEffect, useState } from 'react'

interface NavigationLearningContextType {
  currentLevel: number | null;
  setCurrentLevel: (level: number | null) => void;
  currentUnit: number | null;
  setCurrentUnit: (unit: number | null) => void;
  currentLesson: number | null;
  setCurrentLesson: (lesson: number | null) => void;
  hasShownModal: boolean | null;
  setHasShownModal: (hsm: boolean | null) => void;
  test: boolean | null;
  setTest: (test: boolean | null) => void;
}

const NavigationLearningContext = createContext<NavigationLearningContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

    const [currentLevel, setCurrentLevel] = useState<number | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('currentLevel') || 'null') : null;
    })

    const [currentUnit, setCurrentUnit] = useState<number | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('currentUnit') || 'null') : null;
    })

    const [currentLesson, setCurrentLesson] = useState<number | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('currentLesson') || 'null') : null;
    })

    const [hasShownModal, setHasShownModal] = useState<boolean | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('hasShownModal') || 'null') : null;
    })

    const [test, setTest] = useState<boolean | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('test') || 'null') : null;
    })
    
    useEffect(() => {
    // Guarda el estado en localStorage cada vez que cambie
    localStorage.setItem('currentLevel', JSON.stringify(currentLevel));
    localStorage.setItem('currentUnit', JSON.stringify(currentUnit));
    localStorage.setItem('currentLesson', JSON.stringify(currentLesson));
    localStorage.setItem('hasShownModal', JSON.stringify(hasShownModal));
    localStorage.setItem('test', JSON.stringify(test));
    }, [currentLevel, currentUnit, currentLesson, hasShownModal, test]);

  return (
    <NavigationLearningContext.Provider
      value={{ currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson, hasShownModal, setHasShownModal, test, setTest }}
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
