// /* eslint-disable no-unused-vars */
// import axios from 'axios'
// import { useSession } from 'next-auth/react'
// import React, { useEffect, useState } from 'react'

// import LoadingSpinner from '../components/Spinner/Spinner'
// import {
//   ContentContainer,
//   Image,
//   Recommendations,
//   RecommendationsTitle,
//   Section,
//   VideoItem,
//   VideoList,
//   WelcomeTitle
// } from '../styles/HomeMain.styles'
// import { LessonCard, LessonItem } from '../styles/Learning.styles'


// interface MyHomeMainProps {
//   setCurrentLevel: (levelId: number) => void;
//   setCurrentUnit: (unitId: number) => void;
//   setCurrentLesson: (lessonId: number) => void;
//   setActivePage: (activePage: string) => void;
// }

// const HomeMain: React.FC<MyHomeMainProps> = ({ setCurrentLevel, setCurrentUnit, setCurrentLesson, setActivePage }) => {
//   const { data: session } = useSession()

//   const [lessons, setLessons] = useState<any[]>([])
//   const [allLessons, setAllLessons] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchLessons = async () => {
//         try {
//             const response = await axios.get('/ens-api/lessons')
//             console.log('DATA', response.data)
//             const lessonsList = response.data.map((lesson: any) => ({
//                 id: lesson.id,
//                 title: lesson.title,
//                 description: lesson.description,
//                 order: lesson.order
//             }))
//             lessonsList.sort((a, b) => a.order < b.order)
//             setAllLessons(lessonsList)
//         } catch (error) {
//             console.error('Error fetching units:', error)
//         } finally {
//             setIsLoading(false) // Termina la carga, incluso si hay error
//         }
//     }
//     fetchLessons()
// }, [])

// useEffect(() => {
//       const filteredLessons = allLessons.filter(lesson => lesson.title.startsWith('E-01') || 
//         lesson.title.startsWith('B-01') || lesson.title.startsWith('I-01'))   
//       setLessons(filteredLessons)
// }, [allLessons])

// const handleLessonClick = (lessonId: number) => {
//   setCurrentLesson(lessonId) // Actualiza el estado de la unidad actual
//   setCurrentLevel(2)
//   setCurrentUnit(8) 
//   setActivePage('/learning/levels/')
// }

//   return (
//     <Section>
//       <WelcomeTitle>¡Bienvenido, {session?.user?.name}!</WelcomeTitle>
//       <ContentContainer>
//         <div style={{ width: '70%', display: 'inline-block'}}>
//           <p style={{ fontSize: '1.2em', color: '#666' }}>
//             ¡Te damos la bienvenida a nuestra plataforma de aprendizaje de lenguaje de señas!
//           </p>
//           <p style={{ fontSize: '1.2em', color: '#666' }}>
//             Estamos emocionados de que te hayas unido a nosotros en esta jornada para aprender y
//             conectar a través de este hermoso y esencial lenguaje.
//           </p>
//           <p style={{ fontSize: '1.2em', color: '#666' }}>
//             ¡Buena suerte y disfruta del proceso de aprendizaje!
//           </p>
//         </div>
//         <Image src="/signs.gif" alt="Welcome Image" />
//       </ContentContainer>
//       <Recommendations>
//         <RecommendationsTitle>Recomendaciones para ti</RecommendationsTitle>
//         <VideoList>
//             {isLoading ? (
//                 <LoadingSpinner /> // Muestra el spinner mientras se está cargando
//             ) : (
//                 lessons.map(lesson => (
//                   <VideoItem key={lesson.id}>
//                     <LessonItem key={lesson.id} onClick={() => handleLessonClick(lesson.id)}>
//                         <LessonCard>
//                             <h1>{lesson.title}</h1>
//                             <h3>{lesson.description}</h3>
//                         </LessonCard>
//                     </LessonItem>
//                   </VideoItem>  
//                 )))}
//         </VideoList>
//       </Recommendations>
//     </Section>
//   )
// }

// export default HomeMain
