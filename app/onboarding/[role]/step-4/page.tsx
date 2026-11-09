"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { StudentStepLayout } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formats = [
  "1-on-1 live tutoring",
  "Small group live tutoring",
  "Self-paced",
  "Mix of live and self-paced",
]

export default function StudentFormatPage() {
  const router = useRouter()
  const { role } = useParams<{ role: string }>()
  const [format, setFormat] = useState("")
  return (
    <StudentStepLayout
      step={4}
      description="How do you prefer to learn?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href={`/onboarding/${role}/step-3`}>
              <ArrowLeft data-icon="inline-start" />
            </Link>
          </Button>
          <Button type="submit" form="student-format" disabled={!format}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="student-format"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(`/onboarding/${role}/step-5`)
        }}
      >
        <RadioGroup value={format} onValueChange={setFormat} className="gap-2">
          {formats.map((option) => (
            <label
              key={option}
              htmlFor={option}
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm hover:bg-muted/40"
            >
              <RadioGroupItem id={option} value={option} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
      </form>
    </StudentStepLayout>
  )
}
