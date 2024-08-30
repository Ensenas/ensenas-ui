import styled from 'styled-components'

// Estilos
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

export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

export const StatisticsCard = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 80%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`

export const CardTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #0567b1;
`

export const CardContent = styled.p`
  font-size: 1.2em;
  color: #555;
  margin-bottom: 10px;
`
