/* eslint-disable no-unused-vars */
// context/NavigationContext.tsx
import React, { createContext, ReactNode,useContext, useState } from 'react'

interface NavigationLearningContextType {
  currentLevel: number | null;
  setCurrentLevel: (level: number | null) => void;
  currentUnit: number | null;
  setCurrentUnit: (unit: number | null) => void;
  currentLesson: number | null;
  setCurrentLesson: (lesson: number | null) => void;
  hasShownModal: boolean | null;
  setHasShownModal: (hsm: boolean | null) => void;
}

const NavigationLearningContext = createContext<NavigationLearningContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [currentUnit, setCurrentUnit] = useState<number | null>(null)
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)

  return (
    <NavigationLearningContext.Provider
      value={{ currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson }}
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
