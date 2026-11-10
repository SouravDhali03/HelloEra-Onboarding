import { Suspense } from "react"

import { AppLayout } from "@/components/app-layout"
import { ResourceListingPage } from "@/features/resources/components/resource-listing-page"
import { mockCurrentUser } from "@/features/resources/data/mock-user"

export default function ResourcesListingRoute() {
  return (
    <AppLayout activeNav="resources" role={mockCurrentUser.role}>
      <section className="min-h-full bg-muted/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Suspense>
            <ResourceListingPage role={mockCurrentUser.role} />
          </Suspense>
        </div>
      </section>
    </AppLayout>
  )
}
