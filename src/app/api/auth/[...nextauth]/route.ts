// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  // Otras configuraciones
  pages: {
    signIn: '/login' // Página de inicio de sesión personalizada
  }
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     if (account.provider === 'google') {
  //       // Lógica adicional si es necesario
  //     }
  //     return true
  //   },
  //   async redirect(url, baseUrl) {
  //     return baseUrl
  //   },
  //   async session(session, user) {
  //     session.user.id = user.id
  //     return session
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     if (user) {
  //       token.id = user.id
  //     }
  //     return token
  //   }
  // }
})

export { handler as GET, handler as POST }