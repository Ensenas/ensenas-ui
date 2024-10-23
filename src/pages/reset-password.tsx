/* eslint-disable no-unused-vars */
'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { token } = router.query

    async function handleResetPassword(formData: FormData) {
        // This is a mock implementation. Replace with your actual API call.
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, token: token })
        })

        const data = await response.json()
        return data
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setMessage('')

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden')
            setIsLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('password', password)
        formData.append('token', token as string || '')

        try {
            const result = await handleResetPassword(formData) as { error?: string; success?: string }
            if (result.error) {
                setMessage(result.error)
            } else if (result.success) {
                setMessage(result.success)
            }
        } catch (error) {
            setMessage('Ha ocurrido un error. Por favor, intenta de nuevo.')
        }

        setIsLoading(false)
    }

    return (
        <div className="reset-password-container">
            <div className="reset-password-form">
                <div className="logo-container">
                    <Image
                        src="/logo.png"
                        alt="Enseñas"
                        width={120}
                        height={120}
                        priority
                    />
                </div>
                <h1>Restablecer Contraseña</h1>
                <p>Ingresa tu nueva contraseña para restablecer tu cuenta.</p>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-password"
                            placeholder="Nueva Contraseña"
                            aria-label="Nueva Contraseña"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input-password"
                            placeholder="Confirmar Contraseña"
                            aria-label="Confirmar Contraseña"
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}
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
                .reset-password-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f0f0;
                    padding: 1rem;
                }
                .reset-password-form {
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
                .input-password {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .input-password:focus {
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
                    width: 100%
                }
                .back-button:hover {
                    color: #045291;
                    background-color: transparent;
                }
            `}</style>
        </div>
    )
}