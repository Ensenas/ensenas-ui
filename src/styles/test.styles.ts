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

export const LessonTitle = styled.h3`
  margin: 0;
  font-size: 1em;
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
