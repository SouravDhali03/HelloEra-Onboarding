import { notFound } from "next/navigation"

import { RoleAvatar } from "@/components/account-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUsers } from "@/features/newsfeed/data/mock-newsfeed-data"

export function generateStaticParams() {
  return Object.values(mockUsers).map((user) => ({ userId: user.id }))
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const user = Object.values(mockUsers).find((candidate) => candidate.id === userId)

  if (!user) notFound()

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <RoleAvatar name={user.name} role={user.role} size="lg" />
          <div>
            <CardTitle>{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.roleLabel}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This profile is part of the Era community.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
