import Link from "next/link"

import { ArrowLeft } from "lucide-react"

import { AppLayout } from "@/components/app-layout"
import { ResourceListingPage } from "@/features/resources/components/resource-listing-page"
import { Button } from "@/components/ui/button"

export default function ResourcesListingRoute() {
  return (
    <AppLayout activeNav="resources">
      <section className="min-h-full bg-muted/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/resources">
              <ArrowLeft data-icon="inline-start" />
              Back to Resources
            </Link>
          </Button>
          <ResourceListingPage />
        </div>
      </section>
    </AppLayout>
  )
}
