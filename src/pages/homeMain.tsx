import { useSession } from 'next-auth/react'
import React from 'react'

import { ContentContainer, Image, Recommendations, RecommendationsTitle, Section, VideoItem, 
  VideoList, WelcomeTitle } from '../styles/HomeMain.styles'

const HomeMain: React.FC = () => {
  const { data: session } = useSession()

  return (
    <Section>
      <WelcomeTitle>¡Bienvenido, {session?.user?.name}!</WelcomeTitle>
      <ContentContainer>
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
        <Image src="/signs.gif" alt="Welcome Image" />
      </ContentContainer>
      <Recommendations>
        <RecommendationsTitle>Recomendaciones para ti</RecommendationsTitle>
        <VideoList>
          <VideoItem>Video 1</VideoItem>
          <VideoItem>Video 2</VideoItem>
          <VideoItem>Video 3</VideoItem>
        </VideoList>
      </Recommendations>
    </Section>
  )
}

export default HomeMain
