/* eslint-disable no-unused-vars */
import { NextPage } from 'next'
import Link from 'next/link'

import { BackLink, RegisterContainer } from '../components/RegisterForm/FormElements'
import RegisterForm from '../components/RegisterForm/RegisterForm'

const RegisterPage: NextPage = () => {
  return (
    <RegisterContainer>
      <BackLink href="/" passHref>&lt; Volver Atrás</BackLink>
      <RegisterForm />
    </RegisterContainer>
  )
}

export default RegisterPage
