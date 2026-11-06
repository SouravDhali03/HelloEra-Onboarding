"use client"

import { useCallback, useMemo, useState } from "react"

import { mockPosts } from "../data/mock-newsfeed-data"
import type { Comment, Post } from "../types"

export function useNewsfeedStore() {
  const [posts, setPosts] = useState<Post[]>(() => mockPosts.map((post) => ({ ...post, comments: [...post.comments] })))

  const toggleLike = useCallback((postId: string) => {
    setPosts((current) => current.map((post) => post.id === postId
      ? { ...post, likedByCurrentUser: !post.likedByCurrentUser, likeCount: Math.max(0, post.likeCount + (post.likedByCurrentUser ? -1 : 1)) }
      : post))
  }, [])

  const toggleSave = useCallback((postId: string) => {
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, savedByCurrentUser: !post.savedByCurrentUser } : post))
  }, [])

  const addPost = useCallback((post: Post) => setPosts((current) => [post, ...current]), [])
  const updatePost = useCallback((postId: string, content: string) => setPosts((current) => current.map((post) => post.id === postId ? { ...post, content, updatedAt: new Date().toISOString() } : post)), [])
  const deletePost = useCallback((postId: string) => setPosts((current) => current.filter((post) => post.id !== postId)), [])
  const addComment = useCallback((postId: string, nextComment: Comment) => {
    setPosts((current) => current.map((post) => post.id === postId
      ? { ...post, comments: [...post.comments, nextComment], commentCount: post.commentCount + 1, commentsExpanded: true }
      : post))
  }, [])
  const toggleComments = useCallback((postId: string) => setPosts((current) => current.map((post) => post.id === postId ? { ...post, commentsExpanded: !post.commentsExpanded } : post)), [])

  const savedPosts = useMemo(() => posts.filter((post) => post.savedByCurrentUser), [posts])

  return { posts, savedPosts, toggleLike, toggleSave, addPost, updatePost, deletePost, addComment, toggleComments }
}
