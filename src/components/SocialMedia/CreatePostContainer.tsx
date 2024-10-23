// CreatePostContainer.tsx
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { usePostContext } from './PostContext'

const CreatePostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const TitleInput = styled.input`
  font-size: 20px;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 60%
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`

const FileInput = styled.input`
  margin-bottom: 10px;
`

const Button = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #166fe5;
  }
`

const VideoPreview = styled.video`
  max-width: 100%;
  margin-top: 10px;
`

export default function CreatePost() {
  const [title, setTitle] = useState('Crea una nueva publicación')
  const [content, setContent] = useState('')
  const [video, setVideo] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addPost } = usePostContext()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim() === '') return

    const videoUrl = video ? URL.createObjectURL(video) : ''
    const newPost = {
      title,
      content,
      videoUrl,
      user: {
        name: 'Current User', // This would typically come from authentication
        surname: 'Surname',
        avatar: 'https://i.pravatar.cc/150?img=3' // This would typically come from authentication
      }
    }

    await addPost(newPost, video)

    // Reset form after submission
    setTitle('Crea una nueva publicación')
    setContent('')
    setVideo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <CreatePostContainer>
      <TitleInput
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter post title"
      />
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={handleContentChange}
          placeholder="¿Qué estás pensando?"
          required
        />
        <FileInput
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {video && (
          <VideoPreview controls>
            <source src={URL.createObjectURL(video)} type={video.type} />
            Your browser does not support the video tag.
          </VideoPreview>
        )}
        <Button type="submit">Publicar</Button>
      </Form>
    </CreatePostContainer>
  )
}