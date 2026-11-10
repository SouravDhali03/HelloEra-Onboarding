"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { ResourceCard } from "./resource-card"
import { mockResourceRepository } from "../data/resource-repository"
import { getResourceCollection } from "../data/resource-discovery"
import { mockCurrentUser } from "../data/mock-user"
import { useMockResourceProgress } from "../data/resource-progress-store"
import type {
  Resource,
  ResourceCollection,
  ResourceProgress,
  UserRole,
} from "../types"

const allResources = mockResourceRepository.list()

export function ResourcesPage({
  role = mockCurrentUser.role,
}: {
  role?: UserRole
}) {
  const [category, setCategory] = useState("All")
  const progress = useMockResourceProgress()

  const categories = [
    "All",
    ...new Set(allResources.map((resource) => resource.category)),
  ]
  const filteredResources = useMemo(
    () =>
      allResources.filter((resource) => {
        const matchesCategory =
          category === "All" || resource.category === category
        const isCompleted = progress[resource.id]?.state === "completed"

        return matchesCategory && (category === "All" || !isCompleted)
      }),
    [category, progress]
  )

  const getCollection = (collection: ResourceCollection) =>
    getResourceCollection({
      resources: allResources,
      progress,
      role,
      collection,
    })
  const continueReading = getCollection("continue-reading")
  const suggested = getCollection("suggested-for-you")
  const popular = getCollection("popular-this-week")
  const recentlyUpdated = getCollection("recently-updated")
  const worthReadingAgain = getCollection("worth-reading-again")
  const isFiltering = category !== "All"

  function renderGrid(resourcesToRender: Resource[]) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {resourcesToRender.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            progress={progress[resource.id]}
          />
        ))}
      </div>
    )
  }

  return (
    <section
      data-slot="resources-page"
      className="min-h-full w-full bg-muted/20 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="Filter resources by category"
        >
          {categories.map((item) => (
            <Button
              key={item}
              type="button"
              variant={category === item ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        {isFiltering ? (
          <section
            className="flex flex-col gap-4"
            aria-labelledby="search-results-heading"
          >
            <div>
              <h2
                id="search-results-heading"
                className="font-heading text-xl font-semibold"
              >
                {category} resources
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredResources.length} resources found
              </p>
            </div>
            {filteredResources.length ? (
              renderGrid(filteredResources)
            ) : (
              <Empty className="border">
                <EmptyHeader>
                  <EmptyTitle>No resources found</EmptyTitle>
                  <EmptyDescription>
                    Try a different search or clear the category filter.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </section>
        ) : (
          <div className="flex flex-col gap-10">
            {continueReading.length ? (
              <ResourceSection
                title="Continue Reading"
                description="Pick up where you left off."
                resources={continueReading}
                progress={progress}
                collection="continue-reading"
              />
            ) : null}
            <ResourceSection
              title="Suggested for You"
              description="A starting point based on your active profile."
              resources={suggested}
              progress={progress}
              collection="suggested-for-you"
            />
            <ResourceSection
              title="Popular This Week"
              description="Resources HelloEra learners are exploring."
              resources={popular}
              progress={progress}
              collection="popular-this-week"
            />
            <ResourceSection
              title="Recently Updated"
              description="Fresh material from the HelloEra learning team."
              resources={recentlyUpdated}
              progress={progress}
              collection="recently-updated"
            />
            {worthReadingAgain.length ? (
              <ResourceSection
                title="Worth Reading Again"
                description="Revisit resources you have already completed."
                resources={worthReadingAgain}
                progress={progress}
                collection="worth-reading-again"
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}

function ResourceSection({
  title,
  description,
  resources,
  progress,
  collection,
}: {
  title: string
  description: string
  resources: Resource[]
  progress: Record<string, ResourceProgress>
  collection: ResourceCollection
}) {
  return (
    <section
      className="flex flex-col gap-4"
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
            className="font-heading text-xl font-semibold"
          >
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/resources/listing/?collection=${collection}`}>
            See all
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            progress={progress[resource.id]}
            showProgress={title === "Continue Reading"}
          />
        ))}
      </div>
    </section>
  )
}
