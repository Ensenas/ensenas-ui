'use server'
import type { NextApiRequest, NextApiResponse } from 'next'

//import { verifyResetToken, updateUserPassword } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { password, token } = req.body


    if (!password || !token) {
        return { error: 'La contraseña y el token son requeridos' }
    }

    try {
        const isValidToken = true//await verifyResetToken(token)
        if (!isValidToken) {
            return res.status(400).json({ error: 'El token no es válido o ha expirado' })
        }

        //await updateUserPassword(token, password)

        return res.status(200).json({ success: 'Tu contraseña ha sido restablecida exitosamente.' })
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error)
        return res.status(500).json({ error: 'Ocurrió un error al restablecer tu contraseña. Por favor, intenta de nuevo más tarde.' })
    }
}