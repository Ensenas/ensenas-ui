import React, { useState } from 'react'
import styled from 'styled-components'

import LoadingSpinner from '../../components/Spinner/Spinner'
import { usePostContext } from './PostContext'

const FeedContainerStyled = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
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

// Estilos del contenedor de búsqueda
const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border-radius: 20px;
  margin-left: 8px;
  &::placeholder {
    color: #aaa;
  }
`

const SearchIcon = styled.span`
  font-size: 18px;
  color: #aaa;
  margin-right: 8px;
`

const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 56.25%;
  background-color: #000;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 56.25%;
  background-color: #000;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default function FeedContainer() {
  const [searchQuery, setSearchQuery] = useState('')
  const { posts, searchPosts } = usePostContext()
  const { loading } = usePostContext()

  const handleSearch = (e) => {
    e.preventDefault()
    searchPosts(searchQuery)
  }

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <FeedContainerStyled>
      <SearchContainer onSubmit={handleSearch}>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Buscar en publicaciones... Presiona Enter para buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      {loading ? (
        <SpinnerContainer>
          <LoadingSpinner />
        </SpinnerContainer>
      ) : (
        posts
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 10)
          .map((post) => (
            <PostItem key={post.id}>
              <PostHeader>
                <UserInfo>
                  <Username>
                    {post.user.name} {post.user.surname}
                  </Username>
                  <PostDate>{`${String(new Date(Date.parse(post.created_at)).getDate()).padStart(2, '0')}/
                  ${String(new Date(Date.parse(post.created_at)).getMonth() + 1).padStart(2, '0')}/
                  ${new Date(Date.parse(post.created_at)).getFullYear()} 
                  ${String(new Date(Date.parse(post.created_at)).getHours()).padStart(2, '0')}:
                  ${String(new Date(Date.parse(post.created_at)).getMinutes()).padStart(2, '0')}`}</PostDate>
                </UserInfo>
              </PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              {post.videoUrl &&
                (getYouTubeId(post.videoUrl) ? (
                  <IframeContainer>
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(post.videoUrl)}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </IframeContainer>
                ) : (
                  <VideoContainer>
                    <video controls className="w-full">
                      <source src={post.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </VideoContainer>
                ))}
            </PostItem>
          ))
      )}
    </FeedContainerStyled>
  )
}
