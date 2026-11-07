"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { PasswordField } from "@/components/password-field"
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
} from "@/components/ui/field"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const passwordsMatch = newPassword === confirmPassword

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (newPassword.length < 8 || !passwordsMatch) return
    router.push("/forgot-password/success")
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-none">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-xl">Create a new password</CardTitle>
          <CardDescription>
            Choose a strong password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="forgot-password-reset-form"
            className="flex flex-col gap-6"
            noValidate
            onSubmit={handleSubmit}
          >
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="new-password">New password</FieldLabel>
                <PasswordField
                  id="new-password"
                  name="newPassword"
                  autoComplete="new-password"
                  showRemaining
                  showError={newPassword.length > 0 && newPassword.length < 8}
                  onValueChange={setNewPassword}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm password
                </FieldLabel>
                <PasswordField
                  id="confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  onValueChange={setConfirmPassword}
                />
                {confirmPassword && !passwordsMatch && (
                  <FieldError>Passwords do not match.</FieldError>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="forgot-password-reset-form"
            type="submit"
            size="lg"
            className="w-full"
            disabled={newPassword.length < 8 || !passwordsMatch}
          >
            Change password
          </Button>
          <Button
            asChild
            variant="link"
            size="sm"
            className="font-medium text-foreground"
          >
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
