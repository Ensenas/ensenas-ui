/* eslint-disable no-unused-vars */
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import CreatePost from '../components/SocialMedia/CreatePostContainer'
import PostFeed from '../components/SocialMedia/FeedContainer'
import { PostProvider } from '../components/SocialMedia/PostContext'

const SocialContainer = styled.div`
  padding: 20px;
`

export default function App() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Enseñas - Foro</title>
        <meta
          name="description"
          content="Bienvenido a Enseñas, la mejor plataforma para aprender lenguaje de señas."
        />
      </Head>
      <HomeLayout activePage="/social">
        <PostProvider>
          <SocialContainer>
            <CreatePost />
            <PostFeed />
          </SocialContainer>
        </PostProvider>
      </HomeLayout>
    </ProtectedRoute>
  )
}
