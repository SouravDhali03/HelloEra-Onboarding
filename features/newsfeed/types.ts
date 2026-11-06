export type UserRole =
  | "student"
  | "job_seeker"
  | "freelancer"
  | "tutor"
  | "seller"
  | "employer"

export type User = {
  id: string
  name: string
  role: UserRole
  roleLabel: string
  avatarUrl?: string
}

export type MediaType = "image" | "video"
export type UploadStatus = "ready" | "uploading" | "uploaded" | "failed"

export type MediaItem = {
  id: string
  type: MediaType
  url: string
  thumbnailUrl?: string
  alt: string
  mimeType?: string
  uploadStatus?: UploadStatus
  uploadProgress?: number
}

export type LinkPreview = {
  url: string
  domain: string
  siteName?: string
  title: string
  description?: string
  imageUrl?: string
  status: "ready" | "unavailable"
}

export type Comment = {
  id: string
  author: User
  content: string
  createdAt: string
  updatedAt?: string
  likeCount: number
  likedByCurrentUser: boolean
  parentCommentId?: string | null
  replies?: Comment[]
  canEdit: boolean
  canDelete: boolean
}

export type Post = {
  id: string
  author: User
  content: string
  createdAt: string
  updatedAt?: string
  media: MediaItem[]
  externalUrl?: string
  linkPreview?: LinkPreview
  likeCount: number
  commentCount: number
  shareCount?: number
  likedByCurrentUser: boolean
  savedByCurrentUser: boolean
  comments: Comment[]
  commentsExpanded: boolean
  canEdit: boolean
  canDelete: boolean
}

export type Advertisement = {
  id: string
  title: string
  description: string
  imageUrl: string
  targetUrl: string
  advertiserName: string
  callToAction: string
  isActive: boolean
  priority: number
}
