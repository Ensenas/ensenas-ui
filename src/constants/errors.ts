export type ErrorKey = 'UserAlreadyRegistered' | 'CredentialsSignin' | 'TermsNotAccepted'

export const ERROR_MESSAGES: Record<ErrorKey, string> = {
  UserAlreadyRegistered: 'Usuario ya registrado',
  CredentialsSignin: 'Email o contraseña incorrectos',
  TermsNotAccepted: 'Debe aceptar los términos y condiciones'
}
