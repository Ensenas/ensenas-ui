import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            accessToken: string
            premium: boolean
        }
    }
}