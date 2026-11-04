"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { PasswordField } from "@/components/password-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

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
      <Card className="w-full max-w-[22.5rem] shadow-lg shadow-primary/5">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-2xl">Create a new password</CardTitle>
          <CardDescription>Choose a strong password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="new-password">New password</FieldLabel>
                <PasswordField id="new-password" name="newPassword" autoComplete="new-password" showRemaining onValueChange={setNewPassword} />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                <PasswordField id="confirm-password" name="confirmPassword" autoComplete="new-password" placeholder="Re-enter your password" onValueChange={setConfirmPassword} />
                {confirmPassword && !passwordsMatch && <p className="text-xs text-destructive">Passwords do not match.</p>}
              </Field>
            </FieldGroup>
            <Button type="submit" size="lg" className="w-full" disabled={newPassword.length < 8 || !passwordsMatch}>Change password</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-6 text-sm text-muted-foreground">
          <a href="/sign-in" className="font-medium text-foreground underline-offset-4 hover:underline">Back to sign in</a>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
