import {
  AppLayout,
  type DashboardNavigationKey,
} from "@/components/dashboard-layout"
import { ComingSoonPage } from "@/features/coming-soon/components/coming-soon-page"

const modules = [
  "marketplace",
  "saved",
  "my-learning",
  "find-tutors",
  "study-groups",
  "preferences",
  "settings",
]

export function generateStaticParams() {
  return modules.map((module) => ({ module }))
}

function getActiveNav(module: string): DashboardNavigationKey {
  if (module === "marketplace") return "marketplace"
  if (module === "saved") return "saved"
  return "none"
}

export default async function ComingSoonRoute({
  params,
}: {
  params: Promise<{ module: string }>
}) {
  const { module } = await params

  return (
    <AppLayout activeNav={getActiveNav(module)} activeModule={module}>
      <ComingSoonPage module={module} />
    </AppLayout>
  )
}
