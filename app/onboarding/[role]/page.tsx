import { redirect } from "next/navigation"

export default async function RoleOnboardingPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params
  redirect(`/onboarding/${role}/step-1`)
}
