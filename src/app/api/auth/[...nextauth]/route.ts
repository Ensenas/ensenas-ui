import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

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
          });

          const user = await res.json();

          if (res.ok && user.access_token) {
            return { accessToken: user.access_token, email: credentials?.email, name: credentials?.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error en la autorización:', error);
          return null;
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
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login' // Personaliza la ruta de inicio de sesión si es necesario
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
