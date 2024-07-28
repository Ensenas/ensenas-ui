import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 2px;
  background: #fff; /* Cambia el color de fondo según tus preferencias */
  color: #333; /* Color del texto */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px; /* Tamaño del logo */
    height: auto;
  }

  span {
    font-size: 24px;
    font-weight: bold;
    margin-left: 10px;
  }
`
export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: #f4f4f4;
  border-radius: 20px;
  padding: 5px 15px;
  width: 100%;
  max-width: 500px; /* Ajusta el ancho máximo del campo de búsqueda */

  input {
    border: none;
    background: transparent;
    outline: none;
    padding: 10px;
    flex: 1;
    font-size: 16px;
  }
`

export const SearchButton = styled.button`
  background: transparent;
  border: none;
  padding: 5px;
  cursor: pointer;

  img {
    width: 20px; /* Tamaño del icono de búsqueda */
    height: auto;
  }
`

export const LogoutButton = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #0567b1; /* Color del texto azul */
    background-color: #fff; /* Fondo blanco */
    padding: 15px 20px;
    font-size: 16px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      color: #00397a; /* Color del texto blanco */
    }
  }
`