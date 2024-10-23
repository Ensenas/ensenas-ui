import React from 'react'
import styled from 'styled-components'
import { usePostContext } from './PostContext'

const FeedContainerStyled = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const PostItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
`

const PostDate = styled.span`
  font-size: 14px;
  color: #999;
`

const PostTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`

const PostContent = styled.p`
  font-size: 16px;
  color: #666;
`

const PostVideo = styled.video`
  max-width: 100%;
  margin-top: 10px;
`

export default function FeedContainer() {
  const { posts } = usePostContext()
  console.log(posts)
  return (
    <FeedContainerStyled>
      {posts.map((post) => (
        <PostItem key={post.id}>
          <PostHeader>
            <UserInfo>
              <Username>{post.user.name} {post.user.surname}</Username>
              <PostDate>{new Date(Date.parse(post.created_at)).toLocaleString()}</PostDate>
            </UserInfo>
          </PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          {post.videoUrl && (
            <PostVideo controls>
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </PostVideo>
          )}
        </PostItem>
      ))}
    </FeedContainerStyled>
  )
}