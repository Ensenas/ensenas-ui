/* eslint-disable no-unused-vars */
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, mail, message } = req.body

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

    const htmlTemplatePath = path.join(process.cwd(), 'src', 'styles', 'mail-support.html')
    let htmlContent = fs.readFileSync(htmlTemplatePath, 'utf-8')

    htmlContent = htmlContent.replace(/\${nombre}/g, name)
    htmlContent = htmlContent.replace(/\${mensaje}/g, message)
    htmlContent = htmlContent.replace(/\${ensenas_url}/g, process.env.NEXTAUTH_URL || '')
    const info = await transporter.sendMail({
      from: `"Enseñas" <${process.env.SMTP_USER}>`,
      to: mail,
      subject: 'Soporte - Enseñas',
      html: htmlContent
    })
    const info2 = await transporter.sendMail({
      from: `"Enseñas" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Soporte - Enseñas',
      html: htmlContent
    })

    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Error sending email', error: error.message })
  }
}
