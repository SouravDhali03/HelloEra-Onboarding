"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Mail } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [showErrors, setShowErrors] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget
    const emailInput = form.elements.namedItem("email")
    if (!(emailInput instanceof HTMLInputElement) || !emailInput.value.trim() || !emailInput.checkValidity()) { event.preventDefault(); setShowErrors(true); return }
    event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")?.toString() ?? ""
    router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`)
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-none">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>Enter your email address and we&apos;ll send you a verification code.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="forgot-password-form" className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <InputGroup><InputGroupAddon align="inline-start"><Mail aria-hidden="true" /></InputGroupAddon><InputGroupInput id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></InputGroup>
                {showErrors ? <FieldError className="block group-has-[input:valid]:hidden">Please enter a valid email address.</FieldError> : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button form="forgot-password-form" type="submit" size="lg" className="w-full">Continue</Button>
          <Button asChild variant="link" size="sm" className="font-medium text-foreground">
            <a href="/sign-in"><ChevronLeft data-icon="inline-start" aria-hidden="true" />Back to sign in</a>
          </Button>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
