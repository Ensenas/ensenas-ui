/* eslint-disable no-unused-vars */
// context/NavigationContext.tsx
import React, { createContext, ReactNode,useContext, useEffect, useState } from 'react'

// Define una interfaz de Usuario con campos opcionales si es necesario
interface User {
  id: string; // Opcional, ya que tu API solo devuelve un token
  email?: string;
  name?: string;
  surname?: string;
  birthDate?: Date;
  country?: string;
  accessToken?: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        return isBrowser ? JSON.parse(localStorage.getItem('user') || 'null') : null
    })

    
    useEffect(() => {
    // Guarda el estado en localStorage cada vez que cambie
    localStorage.setItem('currentLevel', JSON.stringify(currentUser))

    }, [currentUser])

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
