/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

interface User {
  id: string
  email: string
  name: string
  accessToken: string
  premium: boolean
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: async (profile) => {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/google-login`, {
          method: 'POST',
          body: JSON.stringify({
            mail: profile.email,
            password: profile.at_hash,
            name: profile.given_name,
            surname: profile.family_name,
            birthDate: '',
            country: 'Argentina'
          })
        })

        if (response) {
          let json = await response.json()

          if (json.status == 400 && json.message.includes('USER ALREADY REGISTERED')) {
            return {
              id: 'sdfsdf05421665',
              email: 'ischerer@frba.utn.edu.ar',
              name: 'Ivan Gabriel Scherer',
              accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiaXZhbi5nLnNjaGVyZXJAZ21haWwu' +
                'Y29tIiwibmFtZSI6Ikl2YW4gIiwic3VybmFtZSI6IlNjaGVyZXIiLCJyb2xlIjpudWxsLCJpYXQiOjE3Mjg4NTMxNDA' +
                'sImV4cCI6MTcyODg1Njc0MH0.ahyPJEjdqD4P_LeUS7vCRSBu1nDR9ktkvKx3U3imZV4',
              premium: false
            } as User
          } else {
            return {
              id: json.id,
              email: json.mail,
              name: json.name + ' ' + json.surname,
              accessToken: '',
              premium: false
            } as User
          }
        } else {
          return {} as User
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
        token.accessToken = (user as any).accessToken ?? ''
        token.premium = (user as any).premium ?? false // Added optional chaining
      }
      if (account?.access_token) {
        token.accessToken = account.access_token
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
