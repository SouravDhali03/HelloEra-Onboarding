"use client"

import { ResourceCard } from "./resource-card"
import { mockCurrentUser } from "../data/mock-user"
import { getResourceCollection } from "../data/resource-discovery"
import { mockResourceRepository } from "../data/resource-repository"
import { useMockResourceProgress } from "../data/resource-progress-store"
import type { UserRole } from "../types"

const allResources = mockResourceRepository.list()

export function ResourceSuggestions({
  currentResourceId,
  role = mockCurrentUser.role,
}: {
  currentResourceId: string
  role?: UserRole
}) {
  const progress = useMockResourceProgress()
  const suggestedResources = getResourceCollection({
    resources: allResources,
    progress,
    role,
    collection: "suggested-for-you",
  }).filter((resource) => resource.id !== currentResourceId)

  if (!suggestedResources.length) return null

  return (
    <section
      className="mt-8 flex flex-col gap-4 border-t pt-8"
      aria-labelledby="suggested-resources-heading"
    >
      <div>
        <h2
          id="suggested-resources-heading"
          className="font-heading text-xl font-semibold"
        >
          Suggested for You
        </h2>
        <p className="text-sm text-muted-foreground">
          A starting point based on your active profile.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {suggestedResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            progress={progress[resource.id]}
          />
        ))}
      </div>
    </section>
  )
}
