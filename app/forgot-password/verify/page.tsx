"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

function maskEmail(email: string) {
  const [local, domain] = email.split("@")
  if (!local || !domain) return "your email address"
  return `${local.slice(0, 1)}${"•".repeat(Math.max(1, Math.min(local.length - 1, 4)))}@${domain}`
}

function VerifyForgotPasswordPage() {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get("email") ?? ""
  const [digits, setDigits] = useState<string[]>(Array(8).fill(""))
  const [seconds, setSeconds] = useState(30)
  const [message, setMessage] = useState("")
  const code = digits.join("")

  useEffect(() => {
    if (seconds === 0) return
    const timer = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000
    )
    return () => window.clearInterval(timer)
  }, [seconds])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (code.length !== 8) return
    router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}`)
  }

  function resendCode() {
    if (seconds > 0) return
    setDigits(Array(8).fill(""))
    setSeconds(30)
    setMessage("A new verification code has been sent.")
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-none">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-xl">Verify your email</CardTitle>
          <CardDescription>
            Enter the 8-digit code sent to {maskEmail(email)}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="forgot-password-verify-form"
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <Field>
              <FieldLabel htmlFor="forgot-otp">Verification code</FieldLabel>
              <InputOTP
                id="forgot-otp"
                maxLength={8}
                value={code}
                onChange={(value) =>
                  setDigits(
                    Array.from({ length: 8 }, (_, index) => value[index] ?? "")
                  )
                }
                containerClassName="mx-auto justify-center gap-1.5"
                aria-label="8-digit verification code"
              >
                <InputOTPGroup className="gap-1.5 rounded-none">
                  {digits.map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="rounded-none border-0 border-b-2 bg-transparent text-lg shadow-none first:rounded-none first:border-l-0 last:rounded-none last:border-r-0"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription
                aria-live="polite"
                className="flex items-center gap-1"
              >
                {message ||
                  (seconds > 0
                    ? `You can resend a code in ${seconds}s.`
                    : "Didn't receive the code?")}
                {!message && seconds === 0 ? (
                  <Button
                    type="button"
                    variant="link"
                    size="xs"
                    className="h-auto p-0 text-sm font-normal text-foreground"
                    onClick={resendCode}
                  >
                    Resend code
                  </Button>
                ) : null}
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="forgot-password-verify-form"
            type="submit"
            size="lg"
            className="w-full"
            disabled={code.length !== 8}
          >
            Verify code
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

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VerifyForgotPasswordPage />
    </Suspense>
  )
}
