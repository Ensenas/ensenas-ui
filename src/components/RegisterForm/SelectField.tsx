import React from 'react'
import { BiChevronDown } from 'react-icons/bi'

import { SelectProps } from '../../types/propTypes'
import { Container, ErrorText, Label, Select, SelectContainer } from './SelectFieldElements'


const SelectField: React.FC<SelectProps> = ({ label, value, onChange, options, error }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <SelectContainer>
                <Select value={value} onChange={onChange} required>
                    <option value='' disabled>Selecciona una opción</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Select>
                <BiChevronDown style={{ position: 'absolute', right: '2rem', pointerEvents: 'none' }} />
            </SelectContainer>
            {error && <ErrorText>{error}</ErrorText>}
        </Container>
    )
}

export default SelectField
