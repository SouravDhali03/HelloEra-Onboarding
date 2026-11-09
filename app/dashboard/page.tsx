import { AppLayout } from "@/components/app-layout"
import { NewsfeedPage } from "@/features/newsfeed/components/newsfeed-page"

export default function DashboardPage() {
  return (
    <AppLayout activeNav="newsfeed">
      <NewsfeedPage activeRole="student" />
    </AppLayout>
  )
}
