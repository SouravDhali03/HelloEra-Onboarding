"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, UserRound } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { PasswordField } from "@/components/password-field"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { Button } from "@/components/ui/button"
import { setStoredUserName } from "@/lib/user-profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function SignUpPage() {
  const router = useRouter()
  const [showErrors, setShowErrors] = useState(false)

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-none">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Get started with your free account today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-up-form"
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
              const form = event.currentTarget
              const hasInvalidField = Array.from(form.elements).some(
                (element) =>
                  element instanceof HTMLInputElement &&
                  ((element.required && !element.value.trim()) ||
                    !element.checkValidity())
              )
              if (hasInvalidField) {
                event.preventDefault()
                setShowErrors(true)
                return
              }
              event.preventDefault()
              const formData = new FormData(event.currentTarget)
              const email = String(formData.get("email") ?? "")
              const fullName = String(formData.get("fullName") ?? "").trim()
              setStoredUserName(fullName)
              router.push(`/verify-email?email=${encodeURIComponent(email)}`)
            }}
          >
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="full-name">Full name</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <UserRound aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="full-name"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </InputGroup>
                {showErrors ? (
                  <FieldError className="block group-has-[input:valid]:hidden">
                    Please fill out this field.
                  </FieldError>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <Mail aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </InputGroup>
                {showErrors ? (
                  <FieldError className="block group-has-[input:valid]:hidden">
                    Please enter a valid email address.
                  </FieldError>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <PasswordField
                  autoComplete="new-password"
                  showRemaining
                  showError={showErrors}
                />
              </Field>
            </FieldGroup>
            <FieldSeparator>or continue with</FieldSeparator>
            <SocialLoginButtons />
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="sign-up-form"
            type="submit"
            size="lg"
            className="w-full"
          >
            Create an account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <span>Already have an account?</span>
            <a
              href="/sign-in"
              className="ml-1 font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
