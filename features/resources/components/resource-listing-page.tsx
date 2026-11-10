"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { ResourceCard } from "./resource-card"
import { getResourceCollection } from "../data/resource-discovery"
import { mockCurrentUser } from "../data/mock-user"
import { mockResourceRepository } from "../data/resource-repository"
import { useMockResourceProgress } from "../data/resource-progress-store"
import type { ResourceCollection, UserRole } from "../types"

const collectionLabels: Record<ResourceCollection, string> = {
  "all-resources": "All resources",
  "continue-reading": "Continue Reading",
  "suggested-for-you": "Suggested for You",
  "popular-this-week": "Popular This Week",
  "recently-updated": "Recently Updated",
  "worth-reading-again": "Worth Reading Again",
}

export function ResourceListingPage({
  collection = "all-resources",
  role = mockCurrentUser.role,
}: {
  collection?: ResourceCollection
  role?: UserRole
}) {
  const searchParams = useSearchParams()
  const resources = mockResourceRepository.list()
  const progress = useMockResourceProgress()
  const requestedCollection = searchParams.get("collection")
  const selectedCollection = Object.hasOwn(
    collectionLabels,
    requestedCollection ?? ""
  )
    ? (requestedCollection as ResourceCollection)
    : collection
  const collectionResources = getResourceCollection({
    resources,
    progress,
    role,
    collection: selectedCollection,
  })
  const collectionLabel = collectionLabels[selectedCollection]

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/resources/">Resources</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{collectionLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {collectionLabel}
        </h1>
      </header>
      {collectionResources.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {collectionResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              progress={progress[resource.id]}
              showProgress={selectedCollection === "continue-reading"}
            />
          ))}
        </div>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No resources found</EmptyTitle>
            <EmptyDescription>
              There are no resources in this collection yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  )
}
