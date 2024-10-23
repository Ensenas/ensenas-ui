/* eslint-disable no-unused-vars */
// PostContext.tsx
import axios from 'axios'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface Post {
    id: number
    title: string
    content: string
    videoUrl: string
    created_at: string
    user: {
        name: string,
        surname: string
        avatar: string
    }
}

interface PostContextType {
    posts: Post[]
    addPost: (post: Omit<Post, 'id' | 'created_at' | 'videoUrl'>, videoFile: File | null) => Promise<void>
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const usePostContext = () => {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider')
    }
    return context
}

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([])

    // Fetch posts from the API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/ens-api/posts/posts')
                const data: Post[] = response.data
                setPosts(data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }

        fetchPosts()
    }, [])

    // Add a new post to the API
    const addPost = async (newPost: Omit<Post, 'id' | 'created_at' | 'videoUrl'>, videoFile: File | null) => {
        const token = localStorage.getItem('authToken')
        if (!token) {
            console.error('No se encontró el token JWT, el usuario no está autenticado.')
            return
        }

        try {
            const formData = new FormData()

            // Añadir los campos de texto al FormData
            formData.append('title', newPost.title)
            formData.append('content', newPost.content)
            formData.append('userName', newPost.user.name)
            formData.append('userSurname', newPost.user.surname)

            // Añadir el archivo de video si existe
            if (videoFile) {
                formData.append('video', videoFile)
            }

            // Enviar la solicitud al backend para crear el post
            const response = await axios.post(
                '/ens-api/posts/create-post',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            // El backend debería devolver el post creado con el videoUrl de S3
            const createdPost: Post = response.data
            setPosts(prevPosts => [createdPost, ...prevPosts])
        } catch (error) {
            console.error('Error adding post:', error)
        }
    }

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    )
}
