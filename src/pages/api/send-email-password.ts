/* eslint-disable no-unused-vars */
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, newPassword } = req.body
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const htmlTemplatePath = '/public/mail.html'
    let htmlContent = fs.readFileSync(process.cwd() + htmlTemplatePath, 'utf-8')

    htmlContent = htmlContent.replace(/\${newPassword}/g, newPassword)

    const info = await transporter.sendMail({
      from: `"Enseñas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reestablecer Contraseña - Enseñas',
      text: `Su nueva contraseña es: ${newPassword}.`,
      html: htmlContent
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
