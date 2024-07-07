import React, { useState } from 'react'
import { AiOutlineMail, AiOutlineUnlock, AiOutlineUser } from 'react-icons/ai'
import AppLogoTitle from '../AppLogoTitle'
import Button from '../Button'
import GoogleSignInButton from '../Button/GoogleButton'
import {
    Container,
    Form,
    FormTitle,
    InfoText,
    InfoTextContainer,
    Link
} from './FormElements'
import InputField from './InputField'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <Container>

            <Form onSubmit={handleLogin}>
                <AppLogoTitle />
                <FormTitle> ¡La mejor forma para aprender lengua de señas! </FormTitle>

                <InputField
                    placeholder='Usuario'
                    type='email'
                    icon={<AiOutlineUser />}
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                <InputField
                    placeholder='Contraseña'
                    type='password'
                    icon={<AiOutlineUnlock />}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <Link href="/forgot-password">
                    ¿Olvidaste tu contraseña?
                </Link>

                <Button
                    type='submit'
                    title='Iniciar Sesión'
                />
                <span>ó</span>
                <GoogleSignInButton />

                <InfoTextContainer>
                    <InfoText>
                        ¿No tenes tu cuenta?
                    </InfoText>

                    <Link href='/signup'>
                        ¡Registrate!
                    </Link>
                </InfoTextContainer>
            </Form>
        </Container>
    )
}

export default LoginForm