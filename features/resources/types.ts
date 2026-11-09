export type ResourceType = "Article" | "Guide" | "Notes" | "PDF"
export type ReadingState = "unread" | "in_progress" | "completed"

export type Resource = {
  id: string
  title: string
  description: string
  category: string
  subject: string
  tags: string[]
  type: ResourceType
  language: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  author: string
  readingTime?: number
  pageCount?: number
  publishedAt: string
  updatedAt: string
  imageUrl: string
  content: string[]
  roleRelevance: string[]
}

export type ResourceProgress = {
  state: ReadingState
  percent: number
  lastOpenedAt?: string
}
