"use client"
import { useState } from "react"
import { AuthShell } from "@/components/auth-shell"
import Link from "next/link"
import { Mail } from "lucide-react"
import { PasswordField } from "@/components/password-field"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { Button } from "@/components/ui/button"
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

export default function SignInPage() {
  const [showErrors, setShowErrors] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-none">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="sign-in-form"
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitMessage("")
              const form = event.currentTarget
              const hasInvalidField = Array.from(form.elements).some(
                (element) =>
                  element instanceof HTMLInputElement &&
                  ((element.required && !element.value.trim()) ||
                    !element.checkValidity())
              )
              if (hasInvalidField) {
                setShowErrors(true)
                return
              }

              setSubmitMessage("Sign-in is not connected yet.")
            }}
          >
            <FieldGroup className="gap-4">
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
                <div className="flex items-center justify-between gap-4">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <PasswordField
                  autoComplete="current-password"
                  showError={showErrors}
                />
              </Field>
            </FieldGroup>

            {submitMessage ? (
              <p role="status" className="text-sm text-muted-foreground">
                {submitMessage}
              </p>
            ) : null}

            <FieldSeparator>or continue with</FieldSeparator>
            <SocialLoginButtons />
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="sign-in-form"
            type="submit"
            size="lg"
            className="w-full"
          >
            Sign in
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <span>Don&apos;t have an account?</span>
            <Link
              href="/sign-up"
              className="ml-1 font-medium text-foreground underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
