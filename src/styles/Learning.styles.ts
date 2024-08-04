import styled from 'styled-components'

export const Section = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 2rem;
`

export const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

export const LessonItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
