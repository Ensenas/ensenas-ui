// import { useSession } from 'next-auth/react'
// import React from 'react'
// import styled from 'styled-components'

// const Section = styled.div`
//   margin: 20px;
// `

// const WelcomeTitle = styled.h1`
//   margin-bottom: 20px;
// `

// const ContentContainer = styled.div`
//   text-align: center;
// `

// const ImageContainer = styled.div`
//   width: 100%;
//   background: white;
//   margin-top: 20px;
//   align-items: center;
// `

// const Image = styled.img`
//   width: 100%;
//   max-width: 400px;
//   height: auto;
// `

// const Recommendations = styled.div`
//   margin-top: 20px;
// `

// const VideoList = styled.div`
//   display: flex;
//   overflow-x: auto;
// `

// const VideoItem = styled.div`
//   min-width: 200px;
//   margin-right: 10px;
// `

// const HomeMain: React.FC = () => {
//   const { data: session } = useSession()

//   return (
//     <Section>
//       <WelcomeTitle>¡Bienvenido, {session?.user?.name}!</WelcomeTitle>
//       <ContentContainer>
//         <p>
//           Te damos la bienvenida a nuestra plataforma de aprendizaje de lenguaje de señas! Estamos emocionados de que te 
//           hayas unido a nosotros en esta jornada para aprender y conectar a través de este hermoso y esencial lenguaje.
//         </p>
//         <p>
//           ¡Buena suerte y disfruta del proceso de aprendizaje!
//         </p>
//         <ImageContainer>
//           <Image src="/signs.gif" alt="Welcome Image" />
//         </ImageContainer>
//       </ContentContainer>
//       <Recommendations>
//         <h3>Recomendaciones para ti</h3>
//         <VideoList>
//           <VideoItem>Video 1</VideoItem>
//           <VideoItem>Video 2</VideoItem>
//           <VideoItem>Video 3</VideoItem>
//         </VideoList>
//       </Recommendations>
//     </Section>
//   )
// }

// export default HomeMain
  
import { useSession } from 'next-auth/react'
import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
 margin: 0px;

`

const WelcomeTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 2em;
  color: #0567b1;
`

const ContentContainer = styled.div`
  width: 100%;
  background: white;
  margin-top: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`

const Recommendations = styled.div`
  margin-top: 40px;
`

const RecommendationsTitle = styled.h3`
  font-size: 1.4em;
  color: #333;
`

const VideoList = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
`

const VideoItem = styled.div`
  min-width: 200px;
  margin-right: 15px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1em;
  color: #555;
`

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
