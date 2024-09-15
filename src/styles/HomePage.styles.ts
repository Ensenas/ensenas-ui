import styled from 'styled-components'

export const Section = styled.div`
  margin: 0px;
`
export const ContentContainer = styled.div`
  width: 100%;
  background: white;

  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const TextContainer = styled.div`
  position: relative;
  height: 400px; /* Altura del contenedor */
  padding: 50px; /* Espaciado interno del contenedor */
  box-sizing: border-box; /* Incluye el padding en el cálculo del tamaño total del contenedor */
  overflow: hidden; /* Oculta cualquier contenido que se desborde */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/abstract-colorful-background-design_632743-33.avif'); /* Ruta de la imagen */
    background-repeat: no-repeat; /* Evita que la imagen se repita */
    background-size: cover; /* Asegura que la imagen cubra todo el contenedor */
    background-position: center; /* Centra la imagen en el contenedor */
    opacity: 0.95; /* Opacidad de la imagen */
    z-index: 1; /* Asegura que el pseudo-elemento esté debajo del contenido */
  }

  & > * {
    position: relative;
    z-index: 2; /* Asegura que el contenido esté sobre el pseudo-elemento */
    color: #fff; /* Color del texto para que sea legible sobre el fondo */
  }


`;

export const WelcomeTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 3em;
  color: #fff;
`

export const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`

export const Recommendations = styled.div`
  margin: 40px;
`

export const RecommendationsTitle = styled.h3`
  font-size: 1.4em;
  color: #333;
`

export const VideoList = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  padding: 10px 0;
`

export const VideoItem = styled.div`
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
