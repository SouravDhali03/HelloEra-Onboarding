"use client"

import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")?.toString() ?? ""
    router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`)
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-lg shadow-primary/5">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-2xl">Forgot your password?</CardTitle>
          <CardDescription>Enter your email address and we&apos;ll send you a verification code.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </Field>
            </FieldGroup>
            <Button type="submit" size="lg" className="w-full">Continue</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-6 text-sm text-muted-foreground">
          <a href="/sign-in" className="font-medium text-foreground underline-offset-4 hover:underline">Back to sign in</a>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
