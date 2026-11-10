import { AppLayout } from "@/components/app-layout"
import { ResourcesPage } from "@/features/resources/components/resources-page"
import { mockCurrentUser } from "@/features/resources/data/mock-user"

export default function ResourcesRoute() {
  return (
    <AppLayout activeNav="resources" role={mockCurrentUser.role}>
      <ResourcesPage role={mockCurrentUser.role} />
    </AppLayout>
  )
}
