import styled from 'styled-components'

export const Section = styled.div`
  margin: 0px;
  max-width: 100%; /* Asegura que no sobrepase el ancho de la pantalla */
  overflow: hidden;
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
  overflow-x: hidden;
`

export const RecommendationsTitle = styled.h3`
  font-size: 1.4em;
  color: #333;
  overflow-x: hidden;
`

export const VideoList = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Evita que los elementos se muevan a la siguiente línea */
  overflow-x: auto; /* Permite desplazamiento horizontal */
  padding: 10px 0;
  max-width: 100%; /* Asegura que no sobrepase el ancho del contenedor */
  box-sizing: border-box;
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

  max-height: 250px; /* Ajusta la altura máxima según necesites */
  overflow: hidden;
`

export const LessonCard = styled.a`
  display: block;
  background: #f0f0f0;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  min-height: 180px;

  &:hover {
    background: #0567b1;
  }
  
  h1 {
    font-size: 1.4em;
    color: #0567b1; /* Color del h1 por defecto */
    transition: color 0.3s; /* Opcional: añade transición al color del h1 */
  }
  
  h3 {
    font-size: 1em;
    transition: color 0.3s; /* Opcional: añade transición al color del h1 */
  }

  &:hover h1, &:hover h3, &:hover h5 {
    color: #ffffff; /* Color del h1 cuando se hace hover */
  }
`
export const LessonItem = styled.div`
  margin: 10px 0;
`
