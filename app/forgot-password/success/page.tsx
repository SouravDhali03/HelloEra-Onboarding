import { CheckCircle2, ChevronLeft } from "lucide-react"
import Link from "next/link"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PasswordChangedPage() {
  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] text-center shadow-none">
        <CardHeader className="!gap-0">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" />
          </div>
          <CardTitle className="text-xl">
            Password changed successfully
          </CardTitle>
          <CardDescription>
            Your password has been updated. You can now sign in with your new
            password.
          </CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="flex-col gap-2">
          <Button asChild size="lg" variant="ghost" className="w-full">
            <Link href="/sign-in">
              <ChevronLeft data-icon="inline-start" aria-hidden="true" />
              Back to sign in
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
