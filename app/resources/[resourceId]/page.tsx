import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppLayout } from "@/components/app-layout"
import { ResourceDetailActions } from "@/features/resources/components/resource-detail-actions"
import { mockResources } from "@/features/resources/data/mock-resources"

export function generateStaticParams() {
  return mockResources.map((resource) => ({ resourceId: resource.id }))
}

export default async function ResourceDetailRoute({
  params,
}: {
  params: Promise<{ resourceId: string }>
}) {
  const { resourceId } = await params
  const resource = mockResources.find((item) => item.id === resourceId)

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

  return (
    <AppLayout activeNav="resources">
      <section className="min-h-full bg-muted/20">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/resources">
              <ArrowLeft data-icon="inline-start" />
              Back to Resources
            </Link>
          </Button>
          <Card className="overflow-hidden py-0">
            <div className="relative aspect-[2.4/1] bg-muted">
              <Image
                src={resource.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
            <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge>{resource.type}</Badge>
                <Badge variant="outline">{resource.category}</Badge>
                <Badge variant="outline">{resource.difficulty}</Badge>
              </div>
              <header className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  {resource.subject} · {metadata} · Updated {resource.updatedAt}
                </p>
                <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {resource.title}
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  {resource.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  By {resource.author}
                </p>
              </header>
              <ResourceDetailActions />
              <Separator />
              <article
                id="resource-reader"
                className="flex scroll-mt-24 flex-col gap-5 text-base leading-7"
              >
                {resource.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                <span>{metadata}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppLayout>
  )
}
