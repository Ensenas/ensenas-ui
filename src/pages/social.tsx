/* eslint-disable no-unused-vars */
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
      <HomeLayout activePage='/social'>
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
