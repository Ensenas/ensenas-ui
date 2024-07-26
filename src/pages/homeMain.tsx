import { useSession } from 'next-auth/react'
import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  margin: 20px;
`

const WelcomeTitle = styled.h1`
  margin-bottom: 20px;
`

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
`

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`

const Recommendations = styled.div`
  margin-top: 20px;
`

const VideoList = styled.div`
  display: flex;
  overflow-x: auto;
`

const VideoItem = styled.div`
  min-width: 200px;
  margin-right: 10px;
`

const HomeMain: React.FC = () => {
  const { data: session } = useSession()

  return (
    <Section>
      <WelcomeTitle>¡Bienvenido, {session?.user?.name}!</WelcomeTitle>
      <ColumnsContainer>
        <Column>
          <p>
            ¡Bienvenido a nuestra plataforma de aprendizaje de lenguaje de señas! Estamos emocionados de que te 
            hayas unido a nosotros en esta jornada para aprender y conectar a través de este hermoso y esencial lenguaje.
          </p>
          <p>
            <ul>
              <li>Explora nuestras lecciones y elige una para comenzar.</li>
              <li>Utiliza los recursos y prácticas recomendadas para mejorar tu habilidad.</li>
              <li>Participa en nuestra comunidad para compartir tu progreso y aprender de otros.</li>
            </ul>
          </p>
          <p>
            ¡Buena suerte y disfruta del proceso de aprendizaje!
          </p>
        </Column>
        <Column>
          <Image src="/signs.gif" alt="Welcome Image" />
        </Column>
      </ColumnsContainer>
      <Recommendations>
        <h3>Recomendaciones para ti</h3>
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
  