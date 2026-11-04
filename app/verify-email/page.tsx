"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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
import { Input } from "@/components/ui/input"

function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [digits, setDigits] = useState(() => Array.from({ length: 8 }, () => ""))
  const [secondsLeft, setSecondsLeft] = useState(30)
  const [message, setMessage] = useState("")
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
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

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    setDigits((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)))

    if (digit && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleDigitKeyDown(index: number, key: string) {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 8)
    if (!pastedDigits) {
      return
    }

    setDigits(Array.from({ length: 8 }, (_, index) => pastedDigits[index] ?? ""))
    inputRefs.current[Math.min(pastedDigits.length, 8) - 1]?.focus()
  }

  return (
    <Card className="w-full max-w-[22.5rem] shadow-lg shadow-primary/5">
      <CardHeader className="!gap-0 text-center">
        <CardTitle className="text-2xl">Verify your email</CardTitle>
        <CardDescription>
          Enter the 8-digit code we sent
            {email ? ` to ${maskedEmail}` : " to your email address"}.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault()
            router.push("/onboarding")
          }}
        >
          <Field>
            <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
            <div
              id="verification-code"
              className="flex justify-center gap-1.5"
              role="group"
              aria-label="8-digit verification code"
            >
              {digits.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  ref={(element) => {
                    inputRefs.current[index] = element
                  }}
                  aria-label={`Digit ${index + 1} of 8`}
                  inputMode="numeric"
                  maxLength={1}
                  pattern="[0-9]"
                  required
                  value={digit}
                  onChange={(event) => handleDigitChange(index, event.target.value)}
                  onKeyDown={(event) => handleDigitKeyDown(index, event.key)}
                  onPaste={handlePaste}
                  className="size-9 rounded-none border-0 border-b-2 border-input bg-transparent p-0 text-center text-lg shadow-none ring-0 focus-visible:border-primary focus-visible:ring-0"
                />
              ))}
            </div>
          </Field>

          <Button type="submit" size="lg" className="w-full" disabled={code.length !== 8}>
            Verify email
          </Button>

          <div className="flex flex-col items-center gap-2 text-center text-sm">
            <span className="text-muted-foreground">Didn&apos;t receive the code?</span>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleResend}
              disabled={secondsLeft > 0}
            >
              {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : "Resend code"}
            </Button>
            {message && (
              <p aria-live="polite" className="text-xs text-primary">
                {message}
              </p>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t pt-6 text-sm text-muted-foreground">
        <a href="/sign-up" className="font-medium text-foreground underline-offset-4 hover:underline">
          Back to sign up
        </a>
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
