import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { email } = req.body

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        const resetToken = generateResetToken()


        //const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
        const resetLink = `http://localhost:3001/reset-password?token=${resetToken}`


        const htmlTemplatePath = path.join(process.cwd(), 'src', 'styles', 'mail.html')
        let htmlContent = fs.readFileSync(htmlTemplatePath, 'utf-8')

        htmlContent = htmlContent.replace(/\${resetLink}/g, resetLink)

        const info = await transporter.sendMail({
            from: `"Enseñas" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Reestablecer Contraseña - Enseñas',
            text: `Haz clic en el siguiente enlace para reestablecer tu contraseña: ${resetLink}`,
            html: htmlContent,
        })

        res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Error sending email', error: error.message })
    }
}

// Implement this function to generate a unique reset token
function generateResetToken(): string {
    // This is a simple example. In a real application, you should use a more secure method.
    return Math.random().toString(36).substr(2, 10)
}