import React, { useState, useRef } from 'react'
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

const Title = styled.h2`
  font-size: 24px;
  color: #1877f2;
  margin-bottom: 20px;
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
  const [text, setText] = useState('')
  const [video, setVideo] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addPost } = usePostContext()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() === '') return

    const videoUrl = video ? URL.createObjectURL(video) : ''
    addPost({
      text,
      videoUrl,
      user: {
        name: 'Current User', // This would typically come from authentication
        // avatar: 'https://i.pravatar.cc/150?img=3' // This would typically come from authentication
      }
    })

    // Reset form after submission
    setText('')
    setVideo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <CreatePostContainer>
      <Title>Crea una Nueva Publicacion</Title>
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={text}
          onChange={handleTextChange}
          placeholder="¿Que estas pensando?"
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