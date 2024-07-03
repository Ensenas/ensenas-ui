import Head from 'next/head'
import React from 'react'

import Header from '../components/Header'
import { FirstSection, LandingPageContainer, LeftSide, RightSide, 
  Section, SectionContent,SectionTitle } from '../styles/LandingPage.styles'

const LandingPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Enseñas - Landing Page</title>
        <meta name="description" content="Bienvenido a Enseñas, la mejor plataforma para aprender lenguaje de señas." />
      </Head>
      <Header />
      <LandingPageContainer>
        <FirstSection>
          <LeftSide>
            <strong>La plataforma ideal para aprender lenguaje de señas</strong>
            <p>Descubrí este fascinante mundo con la ayuda de la Inteligencia Artificial</p>
            <button>¡Comenzar ya!</button>
          </LeftSide>
          <RightSide>
            <img src="/signs.png" alt="Imagen de señas"/>
            <ul>
              <li>Mejora tu comunicación con la comunidad sorda.</li>
              <li>Aumenta tus oportunidades laborales en sectores donde la inclusión es clave.</li>
              <li>Desarrolla una nueva habilidad y enriquece tu perfil profesional.</li>
            </ul>
          </RightSide>
        </FirstSection>
        <Section id="about">
          <SectionTitle>¿Qué es Enseñas?</SectionTitle>
          <SectionContent>
            <p>Enseñas es una innovadora plataforma diseñada para enseñarte lenguaje de señas de manera efectiva y divertida.
               Utilizamos la última tecnología en inteligencia artificial para ofrecerte una experiencia de aprendizaje 
               personalizada y accesible desde cualquier lugar.</p>
            <div className="video-wrapper">
              <img src="/logo.png" alt="Logo de Enseñas" />
              <iframe
                src="https://www.youtube.com/embed/Jis9j5gtZgA?si=1UJxIcWbxcIm-eCa"
                width={500}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video de Enseñas"
              ></iframe>
            </div>
            <p className="start-today">¡Comienza hoy mismo!</p>
            <p>Únete a miles de estudiantes que ya están transformando su forma de comunicarse. Regístrate ahora y comienza 
              tu viaje para dominar el lenguaje de señas con la ayuda de la inteligencia artificial.</p>
          </SectionContent>
        </Section>
        <Section id="how-it-works">
        <SectionTitle>¿Cómo funciona?</SectionTitle>
          
        </Section>
        <Section id="social-impact">
          <h2>Impacto social</h2>
          <p>Contribuimos a una sociedad más inclusiva a través del aprendizaje del lenguaje de señas.</p>
        </Section>
      </LandingPageContainer>
      <footer>
        <p>&copy; 2024 Enseñas. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default LandingPage
