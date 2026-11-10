import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppLayout } from "@/components/app-layout"
import {
  ResourceProgressProvider,
  ResourceReader,
  ResourceTableOfContents,
} from "@/features/resources/components/resource-reader"
import { ResourceSuggestions } from "@/features/resources/components/resource-suggestions"
import { ResourceFeedback } from "@/features/resources/components/resource-feedback"
import {
  createInitialResourceProgress,
  mockResourceProgress,
} from "@/features/resources/data/mock-progress"
import { mockCurrentUser } from "@/features/resources/data/mock-user"
import { mockResourceRepository } from "@/features/resources/data/resource-repository"
import type { ResourceProgress } from "@/features/resources/types"

const resourceProgress: Record<string, ResourceProgress> = mockResourceProgress

export function generateStaticParams() {
  return mockResourceRepository
    .list()
    .map((resource) => ({ resourceId: resource.id }))
}

export default async function ResourceDetailRoute({
  params,
}: {
  params: Promise<{ resourceId: string }>
}) {
  const { resourceId } = await params
  const resource = mockResourceRepository.getById(resourceId)

  if (!resource) {
    return (
      <AppLayout activeNav="resources">
        <section className="flex min-h-full items-center justify-center bg-muted/20 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Resource not found</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/resources">Back to Resources</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </AppLayout>
    )
  }

  const metadata = resource.pageCount
    ? `${resource.pageCount} pages`
    : resource.readingTime
      ? `${resource.readingTime} min read`
      : "Quick read"
  const updatedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${resource.updatedAt}T00:00:00`))
  const sections = resource.sections
  const progress =
    resourceProgress[resource.id] ?? createInitialResourceProgress(resource.id)

  return (
    <AppLayout activeNav="resources">
      <section className="min-h-full bg-muted/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resources">Resources</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{resource.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <ResourceProgressProvider
              initialProgress={progress}
              sections={sections}
            >
              <article className="max-w-3xl min-w-0">
                <header className="mt-2 flex flex-col">
                  <p className="mt-3 text-sm text-muted-foreground">
                    {resource.subject} · {metadata} · Updated {updatedDate}
                  </p>
                  <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                    {resource.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>{resource.type}</Badge>
                    <Badge variant="outline">{resource.category}</Badge>
                    <Badge variant="outline">{resource.difficulty}</Badge>
                  </div>
                </header>
                <Separator className="mt-6" />
                <div className="relative mt-8 aspect-[1.8/1] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={resource.imageUrl}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 768px"
                    priority
                  />
                </div>
                <ResourceReader sections={sections} />
                <ResourceFeedback resourceId={resource.id} />
                <ResourceSuggestions
                  currentResourceId={resource.id}
                  role={mockCurrentUser.role}
                />
              </article>
              <ResourceTableOfContents sections={sections} />
            </ResourceProgressProvider>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
