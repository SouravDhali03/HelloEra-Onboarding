"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

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
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const code = digits.join("")

  useEffect(() => {
    if (seconds === 0) return
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  function updateDigit(index: number, value: string) {
    const next = value.replace(/\D/g, "").slice(-1)
    setDigits((current) => current.map((digit, item) => item === index ? next : digit))
    if (next && index < 7) refs.current[index + 1]?.focus()
  }

  function handlePaste(index: number, value: string) {
    const pasted = value.replace(/\D/g, "").slice(0, 8)
    if (!pasted) return
    setDigits((current) => current.map((digit, item) => pasted[item] ?? (item < index ? digit : "")))
    refs.current[Math.min(index + pasted.length, 7)]?.focus()
  }

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
    refs.current[0]?.focus()
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-lg shadow-primary/5">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>Enter the 8-digit code sent to {maskEmail(email)}.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Field>
              <FieldLabel htmlFor="forgot-otp-0">Verification code</FieldLabel>
              <div className="flex items-center justify-between gap-2" role="group" aria-label="8-digit verification code">
                {digits.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(element) => { refs.current[index] = element }}
                    id={`forgot-otp-${index}`}
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    aria-label={`Digit ${index + 1}`}
                    className="size-9 rounded-none border-0 border-b-2 border-input bg-transparent p-0 text-center text-lg shadow-none ring-0 focus-visible:border-primary focus-visible:ring-0"
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && !digit && index > 0) refs.current[index - 1]?.focus()
                    }}
                    onPaste={(event) => { event.preventDefault(); handlePaste(index, event.clipboardData.getData("text")) }}
                  />
                ))}
              </div>
              <FieldDescription aria-live="polite">{message || (seconds > 0 ? `You can resend a code in ${seconds}s.` : "Didn&apos;t receive the code?")}</FieldDescription>
            </Field>
            <Button type="submit" size="lg" className="w-full" disabled={code.length !== 8}>Verify code</Button>
            <Button type="button" variant="ghost" className="w-full" disabled={seconds > 0} onClick={resendCode}>Resend code</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-6 text-sm text-muted-foreground">
          <a href="/sign-in" className="font-medium text-foreground underline-offset-4 hover:underline">Back to sign in</a>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}

export default function Page() {
  return <Suspense fallback={null}><VerifyForgotPasswordPage /></Suspense>
}
