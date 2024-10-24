import React, { useState } from 'react'
import styled from 'styled-components'
import { Heart, MessageCircle } from 'lucide-react'
import { usePostContext, Comment } from './PostContext'

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

// const Avatar = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// `

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
  justify-content: space-evenly;
  border-top: 1px solid #e4e6eb;
  padding-top: 10px;
`

const ActionButton = styled.button<{ isLiked?: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.isLiked ? '#e41e3f' : '#65676b'};
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

const CommentSection = styled.div`
  margin-top: 10px;
`

const CommentList = styled.div`
  margin-bottom: 10px;
`

const CommentItem = styled.div`
  display: flex;
  margin-bottom: 5px;
`

const CommentContent = styled.div`
  background-color: #f0f2f5;
  border-radius: 18px;
  padding: 8px 12px;
  margin-left: 10px;
`

const CommentText = styled.p`
  margin: 0;
  font-size: 14px;
`

const CommentForm = styled.form`
  display: flex;
  margin-top: 10px;
`

const CommentInput = styled.input`
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 14px;
`

const CommentSubmit = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #166fe5;
  }
`

export default function PostFeed() {
  const { posts, toggleLike, addComment } = usePostContext()
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({})
  const currentUserId = "current-user-id" // !!! From authentication

  const handleCommentChange = (postId: number, text: string) => {
    setCommentTexts(prev => ({ ...prev, [postId]: text }))
  }

  const handleCommentSubmit = (postId: number, e: React.FormEvent) => {
    e.preventDefault()
    const commentText = commentTexts[postId]
    if (commentText && commentText.trim() !== '') {
      addComment(postId, commentText.trim())
      setCommentTexts(prev => ({ ...prev, [postId]: '' }))
    }
  }

  return (
    <FeedContainer>
      {posts.map((post) => (
        <Post key={post.id}>
          <PostHeader>
            {/* <Avatar src={post.user.avatar} alt={post.user.name} /> */}
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
            <ActionButton
              onClick={() => toggleLike(post.id, currentUserId)}
              isLiked={post.likedBy.includes(currentUserId)}
            >
              <Heart size={18} fill={post.likedBy.includes(currentUserId) ? '#e41e3f' : 'none'} /> {post.likes} Likes
            </ActionButton>
            <ActionButton>
              <MessageCircle size={18} /> {post.comments.length} Comments
            </ActionButton>
          </PostActions>
          <CommentSection>
            <CommentList>
              {post.comments.map((comment: Comment) => (
                <CommentItem key={comment.id}>
                  {/* <Avatar src={comment.user.avatar} alt={comment.user.name} /> */}
                  <CommentContent>
                    <Username>{comment.user.name}</Username>
                    <CommentText>{comment.text}</CommentText>
                  </CommentContent>
                </CommentItem>
              ))}
            </CommentList>
            <CommentForm onSubmit={(e) => handleCommentSubmit(post.id, e)}>
              <CommentInput
                type="text"
                placeholder="Write a comment..."
                value={commentTexts[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
              />
              <CommentSubmit type="submit">Publicar</CommentSubmit>
            </CommentForm>
          </CommentSection>
        </Post>
      ))}
    </FeedContainer>
  )
}