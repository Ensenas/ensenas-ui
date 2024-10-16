import { Heart, MessageCircle, Share2 } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'

import { usePostContext } from './PostContext'

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const Post = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
`

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Username = styled.span`
  font-weight: bold;
`

const PostDate = styled.span`
  font-size: 12px;
  color: #65676b;
`

const PostText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
`

const PostVideo = styled.video`
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
`

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e4e6eb;
  padding-top: 10px;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #65676b;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    background-color: #f2f3f5;
  }

  svg {
    margin-right: 5px;
  }
`

export default function PostFeed() {
  const { posts } = usePostContext()

  return (
    <FeedContainer>
      {posts.map((post) => (
        <Post key={post.id}>
          <PostHeader>
            <Avatar src={post.user.avatar} alt={post.user.name} />
            <UserInfo>
              <Username>{post.user.name}</Username>
              <PostDate>{new Date(post.date).toLocaleString()}</PostDate>
            </UserInfo>
          </PostHeader>
          <PostText>{post.text}</PostText>
          {post.videoUrl && (
            <PostVideo controls>
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </PostVideo>
          )}
          <PostActions>
            <ActionButton>
              <Heart size={18} /> {post.likes} Likes
            </ActionButton>
            <ActionButton>
              <MessageCircle size={18} /> {post.comments} Comments
            </ActionButton>
            <ActionButton>
              <Share2 size={18} /> Share
            </ActionButton>
          </PostActions>
        </Post>
      ))}
    </FeedContainer>
  )
}