"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '@/components/PageTemplate';

interface PostsContextProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};