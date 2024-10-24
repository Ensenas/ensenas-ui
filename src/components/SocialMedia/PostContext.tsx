import React, { createContext, useState, useContext, ReactNode } from 'react'

export interface Comment {
    id: number
    text: string
    user: {
        name: string
        // avatar: string
    }
    date: string
}

export interface Post {
    id: number
    text: string
    videoUrl: string
    date: string
    user: {
        name: string
        // avatar: string
    }
    likes: number
    likedBy: string[]
    comments: Comment[]
}

interface PostContextType {
    posts: Post[]
    addPost: (post: Omit<Post, 'id' | 'date' | 'likes' | 'likedBy' | 'comments'>) => void
    toggleLike: (postId: number, userId: string) => void
    addComment: (postId: number, comment: string) => void
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
            text: "Existe una tendencia a denominar “Lenguaje” de señas al idioma de las personas Sordas, lo cual NO ES CORRECTO porque: El lenguaje es una capacidad, es una facultad humana que todos tenemos y es la que nos permite acceder al pensamiento que es tambien propio de cada uno e invisible a la vista de los demás.Este pensamiento, este lenguaje se hace visible a traves del idioma o lengua que adquirimos naturalmente.En este sentido, las lenguas son la institución social que posee una determinada comunidad lingüística.El español es una lengua, no un lenguaje.El lenguaje es una facultad que está en la mente.",
            videoUrl: "https://example.com/video1.mp4",
            date: "2023-05-15T10:30:00Z",
            user: {
                name: "Juan Gomez",
                // avatar: "https://i.pravatar.cc/150?img=1"
            },
            likes: 15,
            likedBy: [],
            comments: [
                {
                    id: 1,
                    text: "Muy Interesante!",
                    user: {
                        name: "Pedro Lopez",
                        // avatar: "https://i.pravatar.cc/150?img=2"
                    },
                    date: "2023-05-15T11:00:00Z"
                }
            ]
        },
        {
            id: 2,
            text: "La Lengua de Señas es una lengua natural de expresión y configuración gesto-espacial y percepción visual (o incluso táctil por ciertas personas con sordoceguera), gracias a la cual las personas Sordas pueden establecer un canal de información básica para la relación con su entorno social, ya sea conformado por sordos u oyentes. De aquí que la Lengua de Señas sea en las comunidades Sordas el principal elemento de transmisión cultural. No se trata de una exigencia propia de los Sordos el preferir una lengua sobre otra, sino que es una necesidad, producto de sus rasgos culturales compartidos y por ello, la Lengua de Señas se convierte en una lengua natural, una lengua que por sus características, cualquier niño o adulto Sordo esta mejor equipado para adquirir (Claros Saavedra, 2005).",
            videoUrl: "",
            date: "2023-05-14T19:45:00Z",
            user: {
                name: "Carlota Perez",
                // avatar: "https://i.pravatar.cc/150?img=2"
            },
            likes: 32,
            likedBy: [],
            comments: []
        }
    ])

    const addPost = (newPost: Omit<Post, 'id' | 'date' | 'likes' | 'likedBy' | 'comments'>) => {
        const post: Post = {
            ...newPost,
            id: posts.length + 1,
            date: new Date().toISOString(),
            likes: 0,
            likedBy: [],
            comments: []
        }
        setPosts(prevPosts => [post, ...prevPosts])
        // TODO: API call to create post
    }

    const toggleLike = (postId: number, userId: string) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? post.likedBy.includes(userId)
                        ? { ...post, likes: post.likes - 1, likedBy: post.likedBy.filter(id => id !== userId) }
                        : { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, userId] }
                    : post
            )
        )
        // TODO: API call to toggle like
    }

    const addComment = (postId: number, commentText: string) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                id: post.comments.length + 1,
                                text: commentText,
                                user: {
                                    name: "Current User",
                                    // avatar: "https://i.pravatar.cc/150?img=3"
                                },
                                date: new Date().toISOString()
                            }
                        ]
                    }
                    : post
            )
        )
        // TODO: API call to add comment
    }


    return (
        <PostContext.Provider value={{ posts, addPost, toggleLike, addComment }}>
            {children}
        </PostContext.Provider>
    )
}