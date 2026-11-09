"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { ResourceCard } from "./resource-card"
import { mockResources } from "../data/mock-resources"
import type { ResourceProgress } from "../types"

const initialProgress: Record<string, ResourceProgress> = {
  "interview-preparation": { state: "in_progress", percent: 42 },
}

export function ResourcesPage() {
  const [category, setCategory] = useState("All")
  const [progress] = useState(initialProgress)

  const categories = [
    "All",
    ...new Set(mockResources.map((resource) => resource.category)),
  ]
  const filteredResources = useMemo(
    () =>
      mockResources.filter((resource) => {
        return category === "All" || resource.category === category
      }),
    [category]
  )

  const continueReading = mockResources.filter(
    (resource) => progress[resource.id]?.state === "in_progress"
  )
  const suggested = mockResources
    .filter((resource) => resource.roleRelevance.includes("student"))
    .slice(0, 3)
  const popular = mockResources.slice(1, 4)
  const recentlyUpdated = mockResources.slice(3, 6)
  const isFiltering = category !== "All"

  function renderGrid(resources: typeof mockResources) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
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
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2
                  id="search-results-heading"
                  className="font-heading text-xl font-semibold"
                >
                  Filtered resources
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredResources.length} resources found
                </p>
              </div>
              <Badge variant="outline">{category}</Badge>
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
              />
            ) : null}
            <ResourceSection
              title="Suggested for You"
              description="A starting point based on your active profile."
              resources={suggested}
              progress={progress}
            />
            <ResourceSection
              title="Popular This Week"
              description="Resources HelloEra learners are exploring."
              resources={popular}
              progress={progress}
            />
            <ResourceSection
              title="Recently Updated"
              description="Fresh material from the HelloEra learning team."
              resources={recentlyUpdated}
              progress={progress}
            />
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
}: {
  title: string
  description: string
  resources: typeof mockResources
  progress: Record<string, ResourceProgress>
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
          <Link href="/resources/listing">See all</Link>
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
