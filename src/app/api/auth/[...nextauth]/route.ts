/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

interface User {
  id: string // Opcional, ya que tu API solo devuelve un token
  email?: string
  name?: string
  accessToken?: string
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: async (profile) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/auth/google-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              mail: profile.email,
              password: 'default_password',
              name: profile.given_name,
              surname: profile.family_name,
              birthDate: '1997-06-17T06:35:49.661Z',
              country: 'Argentina'
            })
          })

          if (response) {
            let json = await response.json()
            let user = {
              id: profile.sub,
              email: json.mail,
              name: json.name + ' ' + json.surname,
              accessToken: json.access_token,
              premium: false
            } as User

            let payments = await fetch(`${process.env.BACKEND_URL}/users/get-payment`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${user.accessToken}`
              }
            })

            let allPayments = await payments.json()
            if (allPayments.length) {
              const lastPayment = allPayments.reduce((masNuevo, actual) => {
                return new Date(actual.date) > new Date(masNuevo.date) ? actual : masNuevo
              })

              user['premium'] = lastPayment['suscription'] == 'PREMIUM'
            }

            return user as User
          } else {
            return {} as User
          }
        } catch (error) {
          console.error('Error in Google profile callback:', error)
          throw error
        }
      }
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
            let payments = await fetch(`${process.env.BACKEND_URL}/users/get-payment`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${data.access_token}`
              }
            })

            let allPayments = await payments.json()
            if (allPayments.length) {
              const lastPayment = allPayments.reduce((masNuevo, actual) => {
                return new Date(actual.date) > new Date(masNuevo.date) ? actual : masNuevo
              })

              return {
                id: data.id,
                email: credentials?.email || '',
                name: data.name + ' ' + data.surname,
                accessToken: data.access_token,
                premium: lastPayment['suscription'] == 'PREMIUM'
              } as User
            } else
              return {
                id: data.id,
                email: credentials?.email || '',
                name: data.name + ' ' + data.surname,
                accessToken: data.access_token,
                premium: false
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
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update' && session?.user) {
        return { ...token, ...session.user }
      }
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.accessToken = (user as any).accessToken as string
        token.premium = (user as any).premium as boolean
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.accessToken = token.accessToken as string
        session.user.premium = token.premium as boolean
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
