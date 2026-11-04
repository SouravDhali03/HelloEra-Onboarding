"use client"

import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { PasswordField } from "@/components/password-field"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  const router = useRouter()

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-lg shadow-primary/5">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Get started with your free account today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={(event) => {
            event.preventDefault()
            const email = String(new FormData(event.currentTarget).get("email") ?? "")
            router.push(`/verify-email?email=${encodeURIComponent(email)}`)
          }}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="full-name">Full name</FieldLabel>
                <Input id="full-name" name="fullName" type="text" placeholder="Enter your full name" autoComplete="name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <PasswordField autoComplete="new-password" showRemaining />
              </Field>
            </FieldGroup>
            <Button type="submit" size="lg" className="w-full">Create an account</Button>
            <FieldSeparator>or continue with</FieldSeparator>
            <SocialLoginButtons />
          </form>
        </CardContent>
        <CardFooter className="justify-center gap-1 border-t pt-6 text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <a href="/sign-in" className="font-medium text-foreground underline-offset-4 hover:underline">Sign in</a>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
