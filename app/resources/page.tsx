import { AppLayout } from "@/components/app-layout"
import { ResourcesPage } from "@/features/resources/components/resources-page"

export default function ResourcesRoute() {
  return (
    <AppLayout activeNav="resources">
      <ResourcesPage />
    </AppLayout>
  )
}
