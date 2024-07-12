import NextLink from 'next/link'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;

    @media (max-width: 768px) {
        background-color: #fff;
    }
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding:  1rem 1.5rem;
    transition:  all 0.5s;
    background-color: #f7f9fa;
    width: 25%;
    height: 90%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    @media (max-width: 1024px) {
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 100%;
        box-shadow: none;
    }
`

export const FormTitle = styled.h2`
    font-size: 1.5rem;
    color: #2d3c49;
    text-align: center;
    padding: 1rem;
`

export const Link = styled(NextLink)`
    color: #2b3a47;
    align-self: flex-end;
    transition: all 0.5s;
    font-size: 0.8rem;

    &:hover {
        color: #010606;
    }
`

export const InfoTextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
`

export const InfoText = styled.span`
    font-size: 0.8rem;
    margin-right: 0.5rem;
`