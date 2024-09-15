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
  WelcomeTitle
} from '../styles/HomePage.styles'
import { LessonCard, LessonItem } from '../styles/Learning.styles'
import { useNavigation } from '../context/NavigationLearningContext'
import HomeModal from '../components/HomeModal/HomeModal'


const HomePage: React.FC = () => {

  const { data: session } = useSession()

  const [lessons, setLessons] = useState<any[]>([])
  const [allLessons, setAllLessons] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentLevel, setCurrentLevel, currentUnit, setCurrentUnit, currentLesson, setCurrentLesson, hasShownModal, setHasShownModal } = useNavigation()
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
    const fetchLessons = async () => {
        try {
            const response = await axios.get('/ens-api/lessons')
            console.log('DATA', response.data)
            const lessonsList = response.data.map((lesson: any) => ({
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                order: lesson.order
            }))
            lessonsList.sort((a, b) => a.order < b.order)
            setAllLessons(lessonsList)
        } catch (error) {
            console.error('Error fetching units:', error)
        } finally {
            setIsLoading(false) // Termina la carga, incluso si hay error
        }
    }
    fetchLessons()
  }, [])

  useEffect(() => {
        const filteredLessons = allLessons.filter(lesson => lesson.title.startsWith('E-01') || 
          lesson.title.startsWith('B-01') || lesson.title.startsWith('I-01'))   
        setLessons(filteredLessons)
  }, [allLessons])

  const handleLessonClick = (lessonId: number) => {
    setCurrentLesson(lessonId) // Actualiza el estado de la unidad actual
    setCurrentLevel(2)
    setCurrentUnit(8) 
    setActivePage('/learning/levels/')
  }

  useEffect(() => {
    if (activePage.startsWith('/learning') && currentLevel) {
      if (currentUnit) {
        setActivePage(`/learning/levels/${currentLevel}/units/${currentUnit}`)
        if(currentLesson){
          setActivePage(`/learning/levels/${currentLevel}/units/${currentUnit}/${currentLesson}`)
        }
      } else {
        setActivePage(`/learning/levels/${currentLevel}`)
      }
    }
  }, [activePage, currentLevel, currentUnit, currentLesson])

  const handleCloseModal = () => {
    setIsModalVisible(false);
    localStorage.setItem('hasShownModal', 'true');
    setHasShownModal(true)
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
            {/* <ContentContainer>
              <Image src="/signs.gif" alt="Welcome Image" />
            </ContentContainer> */}
            <Recommendations>
              <RecommendationsTitle>Recomendaciones para ti</RecommendationsTitle>
              <VideoList>
                  {isLoading ? (
                      <LoadingSpinner /> // Muestra el spinner mientras se está cargando
                  ) : (
                      lessons.map(lesson => (
                        <VideoItem key={lesson.id}>
                          <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson.id)}>
                              <LessonCard>
                                  <h1>{lesson.title}</h1>
                                  <h3>{lesson.description}</h3>
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
