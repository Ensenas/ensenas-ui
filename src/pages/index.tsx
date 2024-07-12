import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import LandingFooter from '../components/LandingFooter'
import LandingHeader from '../components/LandingHeader'
import { FirstSection, ImpactContent, ImpactDescription, ImpactStats, ImpactSubtitle, 
  LandingPageContainer, LeftSide, RightSide, Section, Section2Content, Section3Content, SectionTitle, 
  StatBox, StatLabel, StatNumber, Subsection  } from '../styles/LandingPage.styles'

const LandingPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Enseñas - Landing Page</title>
        <meta name="description" content="Bienvenido a Enseñas, la mejor plataforma para aprender lenguaje de señas." />
      </Head>
      <LandingHeader />
      <LandingPageContainer>
        <FirstSection>
          <LeftSide>
            <strong>La plataforma ideal para aprender lenguaje de señas</strong>
            <p>Descubrí este fascinante mundo con la ayuda de la Inteligencia Artificial</p>
            <Link href="/register" passHref>
              <button>¡Registrate ya!</button>
            </Link>
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
          <Section2Content>
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
          </Section2Content>
        </Section>
        <Section id="how-it-works">
          <SectionTitle>¿Cómo funciona?</SectionTitle>
          <Section3Content>
            <Subsection num="1.">
              <div className="text">
                <h3>Lecciones Interactivas</h3>
                <ul>
                  <li>Aprende a tu propio ritmo con lecciones diseñadas para principiantes y avanzados.</li>
                  <li>Accede a videos, ejercicios prácticos y actividades interactivas.</li>
                </ul>
              </div>
              <div className="image">
                <img src="/lesson.png" alt="Subsección 1" />
              </div>
            </Subsection>
            <Subsection num="2.">
              <div className="image">
                <img src="/ia1.png" alt="Subsección 2" />
              </div>
              <div className="text" data-number="2">
                <h3>Inteligencia Artificial</h3>
                <ul>
                  <li>Nuestro sistema de IA analiza tus gestos y movimientos para corregir 
                    y perfeccionar tu técnica en tiempo real.</li>
                  <li>Recibe retroalimentación instantánea para mejorar continuamente.</li>
                </ul>
              </div>
            </Subsection>
            <Subsection num="3.">
              <div className="text" data-number="3">
                <h3>Práctica y Evaluación</h3>
                <ul>
                  <li>Participa en evaluaciones periódicas para medir tu progreso.</li>
                  <li>Practica con ejercicios específicos y retos diarios.</li>
                </ul>
              </div>
              <div className="image">
                <img src="/test1.png" alt="Subsección 3" />
              </div>
            </Subsection>
          </Section3Content>
        </Section>
        <Section id="social-impact">
          <SectionTitle>Impacto Social</SectionTitle>
          <ImpactContent>
            <ImpactDescription>
              Enseñas está comprometido a facilitar el aprendizaje del lenguaje de señas, 
              promoviendo la inclusión y accesibilidad para personas sordas o con dificultades auditivas.
            </ImpactDescription>
            <ImpactSubtitle>Nuestra objetivo para los próximos 5 años</ImpactSubtitle>
            <ImpactStats>
              <StatBox>
                <StatNumber>100K+</StatNumber>
                <StatLabel>Usuarios felices</StatLabel>
              </StatBox>
              <StatBox>
                <StatNumber>500+</StatNumber>
                <StatLabel>Horas de contenido educativo</StatLabel>
              </StatBox>
              <StatBox>
                <StatNumber>95%</StatNumber>
                <StatLabel>Índice de satisfacción</StatLabel>
              </StatBox>
            </ImpactStats>
            <ImpactDescription>
              A través de nuestra plataforma, buscamos impactar positivamente la vida de miles de personas alrededor del mundo, 
              proporcionando herramientas educativas efectivas y accesibles.
            </ImpactDescription>
          </ImpactContent>
        </Section>
      </LandingPageContainer>
      <LandingFooter />
    </div>
  )
}

export default LandingPage
