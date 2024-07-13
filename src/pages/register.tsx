import { NextPage } from 'next'
import Link from 'next/link'

import { BackLink, RegisterContainer } from '../components/RegisterForm/FormElements'
import RegisterForm from '../components/RegisterForm/RegisterForm'

const RegisterPage: NextPage = () =>  {
  return (
    <RegisterContainer>
      <Link href="/" passHref>
        <BackLink>&lt; Volver Atrás</BackLink>
      </Link>
      <RegisterForm />
    </RegisterContainer>
  )
}

export default RegisterPage