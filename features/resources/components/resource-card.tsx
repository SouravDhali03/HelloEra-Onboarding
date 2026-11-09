import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Resource, ResourceProgress } from "../types"

export function ResourceCard({
  resource,
  progress,
  showProgress = false,
}: {
  resource: Resource
  progress?: ResourceProgress
  showProgress?: boolean
}) {
  const metadata = resource.pageCount
    ? `${resource.pageCount} pages`
    : resource.readingTime
      ? `${resource.readingTime} min read`
      : "Quick read"
  const publishedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${resource.publishedAt}T00:00:00`))

  return (
    <Link
      href={`/resources/${resource.id}`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Open ${resource.title}`}
    >
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-[1.8/1] overflow-hidden bg-muted">
          <Image
            src={resource.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-x-3 top-3 flex items-start gap-2">
            <Badge variant="secondary">{resource.category}</Badge>
          </div>
        </div>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{metadata}</span>
            <span aria-hidden="true">·</span>
            {showProgress && progress ? (
              <span>{progress.percent}% complete</span>
            ) : (
              <span>Published {publishedDate}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="truncate font-heading text-lg leading-tight font-medium">
              {resource.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {resource.description}
            </p>
          </div>
          {progress?.state === "completed" ? (
            <p className="text-xs font-medium text-primary">Completed</p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  )
}
