/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Define una interfaz de Usuario con campos opcionales si es necesario
interface User {
  id: string; // Opcional, ya que tu API solo devuelve un token
  email?: string;
  name?: string;
  accessToken?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mail: credentials?.email,
              password: credentials?.password
            })
          })

          const data = await res.json()

          if (res.ok && data.access_token) {
            // Devuelve un objeto con las propiedades requeridas, usando valores predeterminados
            return {
              id: 'default-id', // Proporciona un valor predeterminado si no tienes un ID
              email: credentials?.email || '',
              name: data.name + ' ' + data.surname, // Proporciona un valor predeterminado si no tienes un nombre
              accessToken: data.access_token
            } as User
          } else {
            return null
          }
        } catch (error) {
          console.error('Error en la autorización:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
