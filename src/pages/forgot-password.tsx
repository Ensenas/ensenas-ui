'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Replace this with your actual API call
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Se ha enviado un enlace para restablecer tu contraseña. Por favor, revisa tu correo.')
      } else {
        setMessage(data.error || 'Ha ocurrido un error. Por favor, intenta de nuevo.')
      }
    } catch (error) {
      setMessage('Ha ocurrido un error. Por favor, intenta de nuevo.')
    }

    setIsLoading(false)
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Enseñas"
            width={120}
            height={120}
            priority
          />
        </div>
        <h1>¿Olvidaste tu contraseña?</h1>
        <p>Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-mail"
              placeholder="Mail"
              aria-label="Correo electrónico"
            />
          </div>
          <div className="button-container">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
        {message && (
          <p className="message" role="alert">
            {message}
          </p>
        )}
        <button onClick={() => router.push('/login')} className="back-button">
          Volver al inicio de sesión
        </button>
      </div>
      <style jsx>{`
        .forgot-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f0f0;
          padding: 1rem;
        }
        .forgot-password-form {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        h1 {
          font-family: inherit;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        p {
          font-family: inherit;
          margin-bottom: 2rem;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          margin-bottom: 1rem;
        }
        .input-mail {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .input-mail:focus {
          outline: none;
          border-color: #0567b1;
        }
        .button-container {
          display: flex;
          justify-content: center;
        }
        button {
          background-color: #0567b1;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #045291;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .message {
          margin-top: 1rem;
          text-align: center;
          font-weight: bold;
        }
        .back-button {
          margin-top: 1rem;
          background-color: transparent;
          color: #0567b1;
          text-decoration: underline;
          width:100%;
        }
        .back-button:hover {
          color: #045291;
          background-color: transparent;
        }
      `}</style>
    </div>
  )
}