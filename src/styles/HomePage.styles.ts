import styled from 'styled-components'

// Contenedor principal que aloja la barra lateral y el contenido
export const HomePageWrapper = styled.div`
  display: flex;
  height: 100%;
  background: #f4f4f4;
`

// Contenedor de la barra lateral
export const SidebarContainer = styled.div`
  width: 15%;
  background: #fff;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`

// Navegación en columna
export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

// Elemento de la navegación
export const NavItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  background: ${({ isActive }) => (isActive ? '#e0e0e0' : 'transparent')};
  border-radius: 5px;
  cursor: pointer;

  span {
    margin-left: 10px;
    font-size: 14px;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  }

  &:hover {
    background: #e0e0e0;
  }
`

// Icono de la navegación
export const NavIcon = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`

// Contenedor del contenido principal
export const ContentContainer = styled.div`
  width: 80%;
  padding: 20px;
`
