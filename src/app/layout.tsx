// src/components/Layout.tsx

import React from 'react'
import Head from 'next/head'

import './global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FONDER',
  description: 'Fonder-UI'
}

type LayoutProps = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div>
      hola ensenas core
    </div>
  )
}

export default Layout
