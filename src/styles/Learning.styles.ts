import styled from 'styled-components'

export const Section = styled.section`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
   margin: 0;
   margin-bottom: 20px;
`

export const LevelCard = styled.a`
  display: block;
  background: #f0f0f0;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0567b1;
  }
  
  h1 {
    color: #0567b1; /* Color del h1 por defecto */
    transition: color 0.3s; /* Opcional: añade transición al color del h1 */
  }

  &:hover h1, &:hover h3 {
    color: #ffffff; /* Color del h1 cuando se hace hover */
  }
`
export const LevelTitle = styled.h2`
  font-size: 1.5rem;
  cursor: pointer;
`

export const UnitCard = styled.a`
  display: block;
  background: #f0f0f0;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0567b1;
  }
  
  h1 {
    color: #0567b1; /* Color del h1 por defecto */
    transition: color 0.3s; /* Opcional: añade transición al color del h1 */
  }

  &:hover h1, &:hover h3 {
    color: #ffffff; /* Color del h1 cuando se hace hover */
  }
`
export const UnitTitle = styled.h2`
  font-size: 1.5rem;
  cursor: pointer;
`

export const LessonCard = styled.a<{ backgroundColor: string }>`
  display: block;
  background: ${(props) => props.backgroundColor || '#f0f0f0'};
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0567b1;
  }
  
  h1 {
    color: #0567b1; /* Color del h1 por defecto */
    transition: color 0.3s; /* Opcional: añade transición al color del h1 */
    margin: 0;
    padding: 0;
  }

  &:hover h1, &:hover h3 {
    color: #ffffff; /* Color del h1 cuando se hace hover */
  }
`
export const LessonItem = styled.div`
  margin: 10px 0;
`

export const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

export const VideoPreview = styled.img`
  width: 150px;
  height: auto;
  margin-right: 20px;
`

export const LessonInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ajusta la distribución horizontal */
`

export const LessonDetails = styled.div`
  flex: 1;
`

export const LessonTitle = styled.h3`
  margin: 0;
  font-size: 1em;
`

export const LessonDescription = styled.p`
  margin: 5px 0 10px;
`

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`

export const ProgressBarContainer = styled.div`
  width: 60%;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10%;
`

export const ProgressBar = styled.div`
  height: 20px;
  background: #0567b1;
`

export const ProgressPercentage = styled.span`
  font-size: 1em;
  color: #0567b1;
`

export const CompletedLessonsList = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten en varias filas si es necesario */
  gap: 20px; /* Espacio entre los elementos */
`

export const CompletedLessonItem = styled.div`
  width: 150px; /* Ajusta el ancho según el diseño */
`

export const CompletedLessonPreview = styled.img`
  width: 100%;
  height: auto;
`

export const CompletedLessonTitle = styled.h4`
  margin: 10px 0 5px;
  font-size: 0.9em;
`

export const CompletedLessonDescription = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: #666;
`