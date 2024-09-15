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

export const SubscriptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Ajusta el tamaño mínimo y máximo de las columnas */
  gap: 20px;
  justify-content: center; /* Centra horizontalmente la grilla */
  align-content: center; /* Centra verticalmente el contenido si hay espacio extra */
  grid-auto-rows: minmax(500px, auto); /* Ajusta la altura mínima de las filas */
  max-width: 70%; /* Ajusta el ancho máximo según tus necesidades */
  margin: 0 auto; /* Centra la grilla dentro del contenedor padre */
`

export const SubscriptionCard = styled.div`
  display: flex;
  flex-direction: column; /* Establece la dirección del flex para apilar elementos verticalmente */
  justify-content: space-between; /* Espacia los elementos para que el contenido y las acciones estén en extremos opuestos */
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  border: 2px solid #0567b1; /* Borde azul */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`

export const CardTitle = styled.h3`
  font-size: 1.4em;
  margin-bottom: 10px;
  color: #333;
`

export const CardContent = styled.p`
  font-size: 1.1em;
  color: #666;
  margin-bottom: 8px;
`

export const CardLogo = styled.div`
  margin: 20px 0; /* Espaciado arriba y abajo del logo */
  display: flex;
  justify-content: center; /* Centra el logo horizontalmente */
  align-items: center; /* Centra el logo verticalmente */
`

export const LogoImage = styled.img`
  max-width: 130px; /* Ajusta el tamaño máximo del logo */
  height: auto; /* Mantiene la relación de aspecto */
`

export const CardActions = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
`

export const ActionButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #0567b1; /* Color del texto azul */
  background-color: #fff; /* Fondo blanco */
  border: 1px solid #0567b1; /* Borde azul */

  &:hover {
      background-color: #0567b1; /* Fondo azul al hacer hover */
      color: #fff; /* Color del texto blanco */
    }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

// Estilo específico para mostrar la suscripción en estado de prueba
export const TrialCard = styled(SubscriptionCard)`
  background-color: #e7f0ff;
  border: 2px solid #b3d7ff;
`

export const TrialTitle = styled(CardTitle)`
  color: #007bff;
`
