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
    const appendReply = (comments: Comment[]): { comments: Comment[]; added: boolean } => {
      let added = false
      const nextComments = comments.map((comment) => {
        if (comment.id === nextComment.parentCommentId) {
          added = true
          return {
            ...comment,
            replies: [...(comment.replies ?? []), nextComment],
          }
        }

        if (comment.replies?.length) {
          const result = appendReply(comment.replies)
          added ||= result.added
          return { ...comment, replies: result.comments }
        }

        return comment
      })

      return { comments: nextComments, added }
    }

    setPosts((current) => current.map((post) => {
      if (post.id !== postId) return post
      if (!nextComment.parentCommentId) {
        return {
          ...post,
          comments: [...post.comments, nextComment],
          commentCount: post.commentCount + 1,
          commentsExpanded: true,
        }
      }

      const result = appendReply(post.comments)
      return result.added
        ? { ...post, comments: result.comments, commentCount: post.commentCount + 1, commentsExpanded: true }
        : post
    }))
  }, [])
  const updateComment = useCallback((postId: string, commentId: string, content: string) => {
    const updateComments = (comments: Comment[]): Comment[] => comments.map((comment) => comment.id === commentId
      ? { ...comment, content, updatedAt: new Date().toISOString() }
      : { ...comment, replies: comment.replies ? updateComments(comment.replies) : comment.replies })

    setPosts((current) => current.map((post) => post.id === postId
      ? { ...post, comments: updateComments(post.comments) }
      : post))
  }, [])
  const deleteComment = useCallback((postId: string, commentId: string) => {
    const removeComment = (comments: Comment[]): { comments: Comment[]; removed: boolean } => {
      let removed = false
      const nextComments = comments.flatMap((comment) => {
        if (comment.id === commentId) {
          removed = true
          return []
        }

        if (comment.replies?.length) {
          const result = removeComment(comment.replies)
          removed ||= result.removed
          return [{ ...comment, replies: result.comments }]
        }

        return [comment]
      })

      return { comments: nextComments, removed }
    }

    setPosts((current) => current.map((post) => {
      if (post.id !== postId) return post
      const result = removeComment(post.comments)
      return result.removed
        ? { ...post, comments: result.comments, commentCount: Math.max(0, post.commentCount - 1) }
        : post
    }))
  }, [])
  const toggleComments = useCallback((postId: string) => setPosts((current) => current.map((post) => post.id === postId ? { ...post, commentsExpanded: !post.commentsExpanded } : post)), [])

  const savedPosts = useMemo(() => posts.filter((post) => post.savedByCurrentUser), [posts])

  return {
    posts,
    savedPosts,
    toggleLike,
    toggleSave,
    addPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
    toggleComments,
  }
}
