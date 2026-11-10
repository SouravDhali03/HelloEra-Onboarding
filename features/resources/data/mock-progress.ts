import type { ResourceProgress } from "../types"
import { mockCurrentUser } from "./mock-user"

export const mockResourceProgress: Record<string, ResourceProgress> = {
  "interview-preparation": {
    resourceId: "interview-preparation",
    userId: mockCurrentUser.id,
    state: "in_progress",
    percent: 33,
    completedSectionIds: ["understand-the-role", "prepare-your-introduction"],
    currentSectionId: "structure-your-examples",
    startedAt: "2026-11-10T08:00:00.000Z",
    lastOpenedAt: "2026-11-10T08:30:00.000Z",
  },
  "study-planning": {
    resourceId: "study-planning",
    userId: mockCurrentUser.id,
    state: "completed",
    percent: 100,
    completedSectionIds: [
      "available-time",
      "weekly-priorities",
      "session-structure",
      "recovery-time",
      "weekly-review",
      "next-week",
    ],
    startedAt: "2026-11-05T08:00:00.000Z",
    completedAt: "2026-11-06T08:30:00.000Z",
    lastOpenedAt: "2026-11-06T08:30:00.000Z",
  },
}

export function createInitialResourceProgress(
  resourceId: string
): ResourceProgress {
  return {
    resourceId,
    userId: mockCurrentUser.id,
    state: "unread",
    percent: 0,
    completedSectionIds: [],
  }
}
