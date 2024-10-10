import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

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

const LoadMoreButton = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #166fe5;
  }
`

interface PostData {
  id: number
  text: string
  videoUrl: string
  date: string
  user: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
}

const samplePosts: PostData[] = [
  {
    id: 1,
    text: "Just finished my first React project! It's been a great learning experience.",
    videoUrl: "https://example.com/video1.mp4",
    date: "2023-05-15T10:30:00Z",
    user: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    likes: 15,
    comments: 3
  },
  {
    id: 2,
    text: "Beautiful sunset at the beach today. Nature never fails to amaze me!",
    videoUrl: "https://example.com/video2.mp4",
    date: "2023-05-14T19:45:00Z",
    user: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    likes: 32,
    comments: 7
  },
  {
    id: 3,
    text: "Just learned about React hooks. They're game-changing!",
    videoUrl: "https://example.com/video3.mp4",
    date: "2023-05-13T14:20:00Z",
    user: {
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    likes: 24,
    comments: 5
  }
]

export default function PostFeed() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setPosts(samplePosts)
      setLoading(false)
    }, 1000)
  }, [])

  const loadMorePosts = () => {
    setLoading(true)
    // Simulating API call for more posts
    setTimeout(() => {
      setPosts(prevPosts => [...prevPosts, ...samplePosts])
      setPage(prevPage => prevPage + 1)
      setLoading(false)
    }, 1000)
  }

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  if (loading && posts.length === 0) {
    return <FeedContainer>Loading posts...</FeedContainer>
  }

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
          <PostVideo controls>
            <source src={post.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </PostVideo>
          <PostActions>
            <ActionButton onClick={() => handleLike(post.id)}>
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
      {loading && <div>Loading more posts...</div>}
      <LoadMoreButton onClick={loadMorePosts} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </LoadMoreButton>
    </FeedContainer>
  )
}