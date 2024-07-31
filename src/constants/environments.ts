export const BACKEND_URL = process.env.BACKEND_URL

// Used by next/auth, no need to export
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
const NEXTAUTH_URL = process.env.NEXTAUTH_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (BACKEND_URL === undefined) {
  throw new Error('BACKEND_URL is undefined, please set it in .env.local')
}

if (NEXTAUTH_SECRET === undefined) {
  throw new Error('NEXTAUTH_SECRET is undefined, please set it in .env.local')
}

if (GOOGLE_CLIENT_ID === undefined) {
  throw new Error('GOOGLE_CLIENT_ID is undefined, please set it in .env.local')
}

if (GOOGLE_CLIENT_SECRET === undefined) {
  throw new Error('GOOGLE_CLIENT_SECRET is undefined, please set it in .env.local')
}

// Vercel sets NEXTAUTH_URL automatically
const isVercelDeployment = process.env.VERCEL === '1'
if (NEXTAUTH_URL === undefined && !isVercelDeployment) {
  throw new Error('NEXTAUTH_URL is undefined, please set it in .env.local')
}


