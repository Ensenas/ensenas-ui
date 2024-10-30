import React, { useState } from 'react';
import styled from 'styled-components';
import { usePostContext } from './PostContext';

const FeedContainerStyled = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const PostItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #999;
`;

const PostTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 16px;
  color: #666;
`;

const PostVideo = styled.video`
  max-width: 100%;
  margin-top: 10px;
`;

// Estilos del contenedor de búsqueda
const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

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
`;

const SearchIcon = styled.span`
  font-size: 18px;
  color: #aaa;
  margin-right: 8px;
`;

export default function FeedContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, searchPosts } = usePostContext();

  const handleSearch = (e) => {
    e.preventDefault();
    searchPosts(searchQuery);
  };

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

      {posts.slice(0, 10).map((post) => (
        <PostItem key={post.id}>
          <PostHeader>
            <UserInfo>
              <Username>{post.user.name} {post.user.surname}</Username>
              <PostDate>{new Date(Date.parse(post.created_at)).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</PostDate>
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
  );
}
