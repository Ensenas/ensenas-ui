

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

export const LessonCard = styled.a`
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
export const LessonItem = styled.div`
  margin: 10px 0;
`
