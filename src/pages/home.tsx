/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'
import {
  ContentContainer,
  Image,
  Recommendations,
  RecommendationsTitle,
  Section,
  TextContainer,
  VideoItem,
  VideoList,
  LessonCard,
  LessonItem,
  WelcomeTitle
} from '../styles/HomePage.styles'
import { Lesson, Level, Unit, useNavigation } from '../context/NavigationLearningContext'
import HomeModal from '../components/HomeModal/HomeModal'


const HomePage: React.FC = () => {

  const { data: session } = useSession()

  const [filteredLessons, setfilteredLessons] = useState<Lesson[]>()
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson,
    levels, units, lessons, isLoading, hasShownModal, setHasShownModal } = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(true); // Estado para controlar la visibilidad del modal
  const [activePage, setActivePage] = useState('/home')
  const [test, setTest] = useState<Boolean>(false)

  useEffect(() => {
    const hasShownModal = localStorage.getItem('hasShownModal');
    console.log('hasshown',hasShownModal)
    if (!hasShownModal) {
      setIsModalVisible(true);
      localStorage.setItem('hasShownModal', 'true'); // Marca que el modal ya se ha mostrado
      console.log('hasshown', hasShownModal)
    }
  }, [])


  useEffect(() => {
    setfilteredLessons(lessons?.filter(lesson => lesson.title.startsWith('E-01') || 
    lesson.title.startsWith('B-01') || lesson.title.startsWith('I-01')) )
  }, [lessons])

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson) // Actualiza el estado de la unidad actual
    setCurrentLevel(findLevel(lesson))
    setCurrentUnit(findUnit(lesson)) 
    setActivePage(`/learning/levels/${currentLevel?.description}/units/${currentUnit?.description}/${currentLesson?.description}`)
  }

  const findLevel = (lesson : Lesson) : Level | null => {
    console.log('substringgg', lesson.title.substring(0,1))
    const currLevel = levels?.find((level : Level) => level.title.startsWith(lesson.title.substring(0,1)))
    if(currLevel != undefined)
      return currLevel
    else
      return null 
  }

  const findUnit = (lesson : Lesson) : Unit | null => {
    console.log('substringgg', lesson.title.substring(0,1))
    const currUnit =  units?.find((level : Level) => level.title.startsWith(lesson.title.substring(0,3)))
    if(currUnit != undefined)
      return currUnit
    else
      return null 
  }


  useEffect(() => {
    if (activePage.startsWith('/learning') && currentLevel) {
      if (currentUnit) {
        setActivePage(`/learning/levels/${currentLevel.description}/units/${currentUnit.description}`)
        if(currentLesson){
          setActivePage(`/learning/levels/${currentLevel.description}/units/${currentUnit.description}/${currentLesson.description}`)
        }
      } else {
        setActivePage(`/learning/levels/${currentLevel.description}`)
      }
    }
  }, [activePage, currentLevel, currentUnit, currentLesson])

  const handleCloseModal = () => {
    setIsModalVisible(false);
    localStorage.setItem('hasShownModal', 'true');
    setHasShownModal(true)
  }

  const getFirstPartString = (string: string): string | undefined => {
    return string.split(':')[0]?.trim();
  }
  
  const getSecondPartString = (string: string): string | undefined => {
    return string.split(':')[1]?.trim();
  }


  return (
    <ProtectedRoute>
      { !hasShownModal ? (
        <HomeModal isVisible={isModalVisible} onClose={handleCloseModal} />
      ): (
        <HomeLayout activePage={activePage}>
          <Section>
            <TextContainer>
              <WelcomeTitle>¡Bienvenid@, {session?.user?.name}!</WelcomeTitle>
                <div style={{ width: '90%', display: 'inline-block'}}>
                  <p style={{ fontSize: '1.2em', color: '#fff' }}>
                    ¡Te damos la bienvenida a nuestra plataforma de aprendizaje de lenguaje de señas!
                  </p>
                  <p style={{ fontSize: '1.2em', color: '#fff' }}>
                    Estamos emocionados de que te hayas unido a nosotros en esta jornada para aprender y
                    conectar a través de este hermoso y esencial lenguaje.
                  </p>
                  <p style={{ fontSize: '1.2em', color: '#fff' }}>
                    ¡Buena suerte y disfruta del proceso de aprendizaje!
                  </p>
                </div>
            </TextContainer>
            <Recommendations>
              <RecommendationsTitle>Recomendaciones para ti</RecommendationsTitle>
              <VideoList>
                  {isLoading ? (
                      <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                  ) : (
                      filteredLessons?.map(lesson => (
                        <VideoItem key={lesson.id}>
                          <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson)}>
                              <LessonCard>
                                  <h3>{getFirstPartString(lesson.description)}</h3>
                                  <h1>{getSecondPartString(lesson.description)}</h1>
                                  <h5>{lesson.title}</h5>
                              </LessonCard>
                          </LessonItem>
                        </VideoItem>  
                      )))}
              </VideoList>
            </Recommendations>
          </Section>
          {/* Aquí puedes agregar más componentes según sea necesario */}
        </HomeLayout>
      )}
    </ProtectedRoute>
  )
}

export default HomePage
