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

export const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: center;
`

export const AchievementCard = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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

export const Medal = styled.div<{ completed: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ completed }) => (completed ? '#ffd700' : '#ccc')};
  border: 3px solid ${({ completed }) => (completed ? '#ffd700' : '#999')};
  margin: 0 auto;
  position: relative;
  margin-bottom: 10px;

  &::after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ completed }) => (completed ? '#ffd700' : '#ccc')};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
