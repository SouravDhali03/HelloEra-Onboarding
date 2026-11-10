import type {
  Resource,
  ResourceCollection,
  ResourceProgress,
  UserRole,
} from "../types"

const popularResourceIdsByRole: Record<UserRole, string[]> = {
  student: ["teaching-with-feedback", "study-planning", "career-notes"],
  "job-seeker": [
    "interview-preparation",
    "career-notes",
    "portfolio-foundations",
  ],
  freelancer: ["portfolio-foundations", "product-photography", "career-notes"],
  tutor: ["teaching-with-feedback", "study-planning", "career-notes"],
  seller: ["product-photography", "career-notes", "teaching-with-feedback"],
  employer: ["teaching-with-feedback", "career-notes", "interview-preparation"],
}

function isFreshResource(
  resource: Resource,
  progress: Record<string, ResourceProgress>
) {
  return !progress[resource.id] || progress[resource.id].state === "unread"
}

function resourcesByIds(resources: Resource[], resourceIds: string[]) {
  const resourceMap = new Map(
    resources.map((resource) => [resource.id, resource])
  )

  return resourceIds
    .map((resourceId) => resourceMap.get(resourceId))
    .filter((resource): resource is Resource => Boolean(resource))
}

export function getResourceCollection({
  resources,
  progress,
  role,
  collection,
}: {
  resources: Resource[]
  progress: Record<string, ResourceProgress>
  role: UserRole
  collection: ResourceCollection
}) {
  const freshResources = resources.filter((resource) =>
    isFreshResource(resource, progress)
  )

  switch (collection) {
    case "continue-reading":
      return resources.filter(
        (resource) => progress[resource.id]?.state === "in_progress"
      )
    case "suggested-for-you":
      return freshResources
        .filter((resource) => resource.roleRelevance.includes(role))
        .slice(0, 3)
    case "popular-this-week":
      return resourcesByIds(
        freshResources,
        popularResourceIdsByRole[role]
      ).slice(0, 3)
    case "recently-updated":
      return [...freshResources]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 3)
    case "worth-reading-again":
      return resources.filter(
        (resource) => progress[resource.id]?.state === "completed"
      )
    default:
      return resources
  }
}
