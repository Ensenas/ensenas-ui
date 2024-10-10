import React, { createContext, useState, useContext, ReactNode } from 'react'

export interface Post {
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

interface PostContextType {
    posts: Post[]
    addPost: (post: Omit<Post, 'id' | 'date' | 'likes' | 'comments'>) => void
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
    const [posts, setPosts] = useState<Post[]>([
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
        }
    ])

    const addPost = (newPost: Omit<Post, 'id' | 'date' | 'likes' | 'comments'>) => {
        const post: Post = {
            ...newPost,
            id: posts.length + 1,
            date: new Date().toISOString(),
            likes: 0,
            comments: 0
        }
        setPosts(prevPosts => [post, ...prevPosts])
    }

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    )
}