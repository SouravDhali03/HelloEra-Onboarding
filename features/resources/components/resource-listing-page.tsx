"use client"

import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { ResourceCard } from "./resource-card"
import { mockResources } from "../data/mock-resources"

export function ResourceListingPage() {
  const [query, setQuery] = useState("")
  const resources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return mockResources

    return mockResources.filter((resource) =>
      `${resource.title} ${resource.description} ${resource.subject} ${resource.tags.join(" ")}`
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [query])

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">Resource library</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          All resources
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Browse the complete HelloEra library and open any resource for its
          full reading experience.
        </p>
      </header>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search all resources"
        aria-label="Search all resources"
      />
      {resources.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No resources match your search.
        </p>
      )}
    </section>
  )
}
