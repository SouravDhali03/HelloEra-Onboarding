"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [digits, setDigits] = useState(() => Array.from({ length: 8 }, () => ""))
  const [secondsLeft, setSecondsLeft] = useState(30)
  const [message, setMessage] = useState("")
  const email = searchParams.get("email")
  const code = digits.join("")
  const maskedEmail = maskEmail(email)

  useEffect(() => {
    if (secondsLeft === 0) {
      return
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [secondsLeft])

  function handleResend() {
    setSecondsLeft(30)
    setDigits(Array.from({ length: 8 }, () => ""))
    setMessage("A new verification code has been sent.")
  }

  return (
    <Card className="w-full max-w-[22.5rem] shadow-none">
      <CardHeader className="!gap-0 text-center">
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>
          Enter the 8-digit code we sent
            {email ? ` to ${maskedEmail}` : " to your email address"}.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="verify-email-form"
          className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding")
        }}
      >
          <Field>
            <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
            <InputOTP
              id="verification-code"
              maxLength={8}
              value={code}
              onChange={(value) => setDigits(Array.from({ length: 8 }, (_, index) => value[index] ?? ""))}
              containerClassName="mx-auto justify-center gap-1.5"
              aria-label="8-digit verification code"
              required
            >
              <InputOTPGroup className="gap-1.5 rounded-none">
                  {digits.map((_, index) => <InputOTPSlot key={index} index={index} className="rounded-none border-0 border-b-2 bg-transparent text-lg shadow-none first:border-l-0 first:rounded-none last:border-r-0 last:rounded-none" />)}
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription aria-live="polite" className="flex items-center gap-1">
              {message || (secondsLeft > 0 ? `You can resend a code in ${secondsLeft}s.` : "Didn't receive the code?")}
              {!message && secondsLeft === 0 ? <Button type="button" variant="link" size="xs" className="h-auto p-0 text-sm font-normal text-foreground" onClick={handleResend}>Resend code</Button> : null}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="verify-email-form" type="submit" size="lg" className="w-full" disabled={code.length !== 8}>
          Verify email
        </Button>
        <Button asChild variant="link" size="sm" className="font-medium text-foreground">
          <a href="/sign-up"><ChevronLeft data-icon="inline-start" aria-hidden="true" />Back to sign up</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

function maskEmail(email: string | null) {
  if (!email || !email.includes("@")) {
    return "your email address"
  }

  const [localPart, domain] = email.split("@")
  if (localPart.length <= 2) {
    return `${localPart[0] ?? ""}***@${domain}`
  }

  return `${localPart[0]}${"*".repeat(Math.max(3, localPart.length - 2))}${localPart.at(-1)}@${domain}`
}

export default function VerifyEmailPage() {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <VerifyEmailForm />
      </Suspense>
    </AuthShell>
  )
}
