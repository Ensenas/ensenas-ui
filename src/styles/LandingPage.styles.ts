import styled from 'styled-components'

interface SubsectionProps {
  num: string;
}

export const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

export const FirstSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`

export const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    font-size: 50px;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    font-size: 20px;
    margin-bottom: 20px;
    color: #444;
  }

  button {
    padding: 10px 20px;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #005bb5;
    }
  }
`

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d5e3fb;

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 120px;
    margin-bottom: 100px;

    li {
      position: relative;
      margin-bottom: 20px;
      font-size: 20px;
      padding-left: 20px;
      color: #444;
    }

    li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border: 2px solid #0070f3;
      background-color: transparent;
      border-radius: 2px;
    }

  }
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 0px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`

export const SectionTitle = styled.h2`
  color: #0070f3;
  font-size: 35px;
  margin-left: 30px;
  margin-bottom: 20px;
`

export const Section2Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 40px;
  

  p {
    font-size: 20px;
    margin-bottom: 20px;
    color: #444;
  }

  img {
    max-width: 100px;
    margin-right: 20px;
  }

  iframe {
    height: 315px;
    margin-bottom: 20px;
  }

  .video-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px;

    img {
      max-width: 300px;
      margin-right: 200px;
    }
  }

  .start-today {
    font-size: 30px;
    font-weight: bold;
  }
`

export const Section3Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
  margin-left: 150px;
`

export const Subsection = styled.div<SubsectionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  .text {
    flex: 1;
    color: #444;

    h3 {
      display: flex;
      align-items: center;
      font-size: 30px;
      margin-bottom: 10px;
      position: relative;

      &::before {
        content: '${props => props.num}';
        font-size: 40px;
        margin-right: 10px;
        position: absolute;
        left: -50px; /* Ajusta la posición según tus necesidades */
        top: 40%;
        transform: translateY(-50%);
        color: ${({ num }) => {
          switch (num) {
            case '1.':
              return '#df464f'
            case '2.':
              return '#e67537'
            case '3.':
              return '#eda939'
            default:
              return 'black'
          }
        }};
        
      }
    }

    ul {
      list-style-type: disc;
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        font-size: 18px;
        color: #444;
      }
    }
  }

  .image {
    flex: 1;
    display: flex;
    justify-content: center;

    img {
      max-width: 22%;
      height: auto;
    }
  }
`

export const ImpactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

export const ImpactSubtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`

export const ImpactDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 30px;
`

export const ImpactStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`

export const StatBox = styled.div`
  text-align: center;
`

export const StatNumber = styled.span`
  font-size: 50px;
  color: #0070f3;
`

export const StatLabel = styled.p`
  font-size: 16px;
  color: #666;
`