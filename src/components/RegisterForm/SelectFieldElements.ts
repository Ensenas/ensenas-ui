import styled from 'styled-components'

export const Container = styled.div`
    margin-bottom: 5px;
`

export const Label = styled.label`
    font-size: 0.85rem;
    width: 100%;
`

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    width: 100%;
    position: relative;

    & svg {
        position: absolute;
        transform: translateX(1rem);
        color: rgba(0, 0, 0, 0.65);
    }
`

export const Select = styled.select`
    font-size: 0.85rem;
    padding: 1rem;
    padding-right: 2.5rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    width: 100%;
    appearance: none; /* Quitar el estilo por defecto del select */
    background: #fff;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0c
    DovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGgg
    ZD0iTTEwLDEyIEwgMyw1IEwgMTAsMTIgMTAsOCBMOSwxMiBMMSwxMiBMMSwzIE0xMCw1IE0
    xMCwxMiBMMywxMiBMMSwxMiBMMSwzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiI
    gc3Ryb2tlLWxpbmVjbGFzcz0iYXJyb3ctdG9wIi8+PC9zdmc+');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
`

export const ErrorText = styled.span`
    color: red;
    font-size: 0.875rem; // Ajusta el tamaño del texto según sea necesario
    margin-top: 0.25rem;
`
