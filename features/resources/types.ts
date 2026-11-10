export type ResourceType = "Article" | "Guide" | "Notes" | "PDF"
export type ReadingState = "unread" | "in_progress" | "completed"
export type UserRole =
  "student" | "job-seeker" | "freelancer" | "tutor" | "seller" | "employer"

export type ResourceCollection =
  | "all-resources"
  | "continue-reading"
  | "suggested-for-you"
  | "popular-this-week"
  | "recently-updated"
  | "worth-reading-again"

export type ResourceContentBlock = {
  id: string
  type: "paragraph"
  text: string
}

export type ResourceSection = {
  id: string
  resourceId: string
  order: number
  title: string
  blocks: ResourceContentBlock[]
}

export type ResourceSectionInput = {
  id: string
  resourceId?: string
  title: string
  paragraphs: string[]
}

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
  sections: ResourceSection[]
  roleRelevance: UserRole[]
}

export type ResourceInput = Omit<Resource, "sections"> & {
  sections: ResourceSectionInput[]
}

export type ResourceProgress = {
  resourceId: string
  userId: string
  state: ReadingState
  percent: number
  completedSectionIds: string[]
  currentSectionId?: string | null
  startedAt?: string
  completedAt?: string
  lastOpenedAt?: string
}
