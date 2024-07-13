import React, { useState } from 'react'

import { InputProps } from '../../types/propTypes'
import {
    Container,
    HidePassIcon,
    Input,
    InputContainer,
    Label,
    ShowPassIcon} from './InputFieldElements'

const InputField = ({ label, placeholder, icon, type, required, value, onChange }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordIcon = () => {
        setShowPassword(!showPassword)
    }

    const renderPasswordIcon = () => {
        if (showPassword) {
            return (
                <HidePassIcon onClick={togglePasswordIcon} />
            )
        }
        else {
            return (
                <ShowPassIcon onClick={togglePasswordIcon} />
            )
        }
    }

    const inputType = type === 'password' && showPassword ? 'text' : type

    return (
        <Container>
            <Label>{label}</Label>
           
            <InputContainer>
                {icon}
                <Input
                    placeholder={placeholder}
                    type={inputType}
                    required={required}
                    value={value}
                    onChange={onChange}
                />

                {
                    type === 'password' &&
                    renderPasswordIcon()
                }
            </InputContainer>
        </Container>
    )
}

export default InputField