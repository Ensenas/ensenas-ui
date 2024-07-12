import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f0f0; /* Color de fondo gris claro */
  color: #333; /* Color del texto */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }

  span {
    font-size: 24px;
    font-weight: bold;
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`

export const NavItem = styled.div`
  margin-left: 25px;
  margin-right: 20px;

  a {
    text-decoration: none;
    color: #333; /* Color del texto gris oscuro */
    font-size: 18px;

    &:hover {
      color: #0070f3; /* Color del texto azul al hacer hover */
    }
  }
`

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
`

export const LoginButton = styled.div`
  margin-left: 20px; /* Espacio entre la barra de navegación y el botón */
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #0070f3; /* Color del texto azul */
    background-color: #fff; /* Fondo blanco */
    padding: 10px 20px;
    border: 1px solid #0070f3; /* Borde azul */
    border-radius: 5px;
    font-size: 18px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #0070f3; /* Fondo azul al hacer hover */
      color: #fff; /* Color del texto blanco */
    }
  }
`