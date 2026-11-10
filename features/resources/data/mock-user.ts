import type { UserRole } from "../types"

export const mockCurrentUser = {
  id: "mock-user",
  role: "student" as const satisfies UserRole,
}
