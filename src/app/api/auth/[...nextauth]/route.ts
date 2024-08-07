import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'email' }, // Cambiado a 'text' ya que el backend espera 'mail'
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   authorize: async (credentials) => {
    //     try {
    //       const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           mail: credentials.email, // Usa 'mail' como en el backend
    //           password: credentials.password
    //         })
    //       })
          
    //       const result = await res.json()

    //       if (res.ok && result.access_token) {
    //         // Retorna un objeto de usuario con el token
    //         const { token } = result.access_token
    //         console.log(token)
    //         // localStorage.setItem('token', token)
    //         return {
    //           accessToken: result.access_token,
    //           email: credentials.email
    //         }
    //       } else {
    //         return null
    //       }
    //     } catch (error) {
    //       console.error('Error al autenticar:', error)
    //       return null
    //     }
    //   }
    // })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si existe un usuario (en el primer inicio de sesión), almacena el token en el JWT
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      // Añade el token de acceso a la sesión
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login' // Página de inicio de sesión personalizada
  },
  secret: process.env.NEXTAUTH_SECRET
})


export { handler as GET, handler as POST }
