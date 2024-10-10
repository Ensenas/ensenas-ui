import React from 'react'
import styled from 'styled-components'
import CreatePost from '../components/SocialMedia/CreatePostContainer'
import PostFeed from '../components/SocialMedia/FeedContainer'
import HomeLayout from '../components/HomeLayout/HomeLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoadingSpinner from '../components/Spinner/Spinner'


const SocialContainer = styled.div`
  padding: 20px;
`

export default function App() {
  return (
    <ProtectedRoute>
      <HomeLayout activePage='/social'>
        <SocialContainer>
          <CreatePost />
          <PostFeed />
        </SocialContainer>
      </HomeLayout>
    </ProtectedRoute>
  )
}