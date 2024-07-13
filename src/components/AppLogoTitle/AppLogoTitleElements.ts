import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    text-decoration: none;
    color: #2b3a47;
`

export const AppTitle = styled.h2`
    font-size: 2rem;
`

export const LogoImage = styled(Image)`
    margin-left: 0.8rem;
    height: 10rem;
    width: 10rem;
`