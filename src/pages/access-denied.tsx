'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AccessDeniedPage() {
    const router = useRouter()

    return (
        <div className="access-denied-container">
            <div className="access-denied-form">
                <div className="logo-container">
                    <Image
                        src="/logo.png"
                        alt="Enseñas"
                        width={120}
                        height={120}
                        priority
                    />
                </div>
                <h1>Acceso Denegado</h1>
                <p>Ups, no tenés permiso para acceder a esta página. Esta sección está reservada para usuarios premium.</p>
                <p>¡Actualizá tu suscripción para desbloquear más contenido!</p>
                <div className="button-container">
                    <button onClick={() => router.push('/suscriptions')}>
                        Actualizar a Premium
                    </button>
                </div>
                <button onClick={() => router.push('/home')} className="back-button">
                    Volver al home
                </button>
            </div>
            <style jsx>{`
        .access-denied-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f0f0;
          padding: 1rem;
        }
        .access-denied-form {
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
          color: #e53e3e;
        }
        p {
          font-family: inherit;
          margin-bottom: 2rem;
          text-align: center;
        }
        .button-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
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
        .back-button {
          margin-top: 1rem;
          background-color: transparent;
          color: #0567b1;
          text-decoration: underline;
          width: 100%;
        }
        .back-button:hover {
          color: #045291;
          background-color: transparent;
        }
      `}</style>
        </div>
    )
}