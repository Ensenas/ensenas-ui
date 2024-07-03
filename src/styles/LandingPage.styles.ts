import styled from 'styled-components'

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
  margin-left: 20px;
  margin-bottom: 20px;
`

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 40px;
  

  p {
    font-size: 20px;
    margin-bottom: 20px;
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