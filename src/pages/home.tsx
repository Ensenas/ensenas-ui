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
  VideoItem,
  VideoList,
  WelcomeTitle
} from '../styles/HomeMain.styles'
import { LessonCard, LessonItem } from '../styles/Learning.styles'


const HomePage: React.FC = () => {

  const { data: session } = useSession()

  const [lessons, setLessons] = useState<any[]>([])
  const [allLessons, setAllLessons] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [currentUnit, setCurrentUnit] = useState<number | null>(null)
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [activePage, setActivePage] = useState('/home')
  const [test, setTest] = useState<Boolean>(false)

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



  return (
    <ProtectedRoute>
      {/* <div>
        <HomeHeader />
        <HomePageWrapper>
          <SidebarContainer>
            <SidebarNav>
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  isActive={activePage === item.href}
                  onClick={() => handleNavigation(item.href)}
                >
                  <NavIcon>
                    <img src={item.icon} alt={`${item.label} Icon`} />
                  </NavIcon>
                  <span>{item.label}</span>
                </NavItem>
              ))}
            </SidebarNav>
          </SidebarContainer>
          <ContentContainer>
            {activePage === '/home' && <HomeMain setCurrentLevel={setCurrentLevel} 
              setCurrentUnit={setCurrentUnit} setCurrentLesson={setCurrentLesson} setActivePage={setActivePage} />}
            {activePage === '/learning' && <MyLearning setCurrentLevel={setCurrentLevel} />}
            {activePage === '/profile' && <Profile />}
            {activePage === '/achievements' && <Achievements />}
            {activePage === '/statistics' && <Statistics />}
            {activePage.startsWith('/learning/levels/') && currentLevel && !currentUnit &&
              <LevelUnits currentLevel={currentLevel} setCurrentUnit={setCurrentUnit} />}
            {activePage.startsWith(`/learning/levels/${currentLevel}`) && currentUnit && !currentLesson &&
              <UnitLessons currentLevel={currentLevel} currentUnit={currentUnit} setCurrentLesson={setCurrentLesson} />}
            {activePage.startsWith(`/learning/levels/${currentLevel}`) && currentUnit && currentLesson && !test &&
              <Lesson currentLevel={currentLevel} currentUnit={currentUnit} currentLesson={currentLesson} setTest={setTest} />}
            {activePage.startsWith(`/learning/levels/${currentLevel}`) && currentUnit && currentLesson && test &&
              <LessonTest currentLevel={currentLevel} currentUnit={currentUnit} 
                currentLesson={currentLesson} setTest={setTest} />}
          </ContentContainer>
        </HomePageWrapper>
      </div> */}
      <HomeLayout activePage={activePage}>
        <Section>
          <WelcomeTitle>¡Bienvenido, {session?.user?.name}!</WelcomeTitle>
          <ContentContainer>
            <div style={{ width: '70%', display: 'inline-block'}}>
              <p style={{ fontSize: '1.2em', color: '#666' }}>
                ¡Te damos la bienvenida a nuestra plataforma de aprendizaje de lenguaje de señas!
              </p>
              <p style={{ fontSize: '1.2em', color: '#666' }}>
                Estamos emocionados de que te hayas unido a nosotros en esta jornada para aprender y
                conectar a través de este hermoso y esencial lenguaje.
              </p>
              <p style={{ fontSize: '1.2em', color: '#666' }}>
                ¡Buena suerte y disfruta del proceso de aprendizaje!
              </p>
            </div>
            <Image src="/signs.gif" alt="Welcome Image" />
          </ContentContainer>
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
    </ProtectedRoute>
  )
}

export default HomePage
