"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { TutorStepLayout } from "@/components/tutor-onboarding"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formats = ["1-on-1 live tutoring", "Small group live tutoring", "Both"]

export default function TutorFormatStep() {
  const router = useRouter()
  const [format, setFormat] = useState("")
  return (
    <TutorStepLayout
      step={2}
      description="Which lesson format do you prefer?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/tutor/step-1">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="tutor-format" disabled={!format}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="tutor-format"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding/tutor/step-3")
        }}
      >
        <Field>
          <RadioGroup
            value={format}
            onValueChange={setFormat}
            className="gap-2"
          >
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
        </Field>
      </form>
    </TutorStepLayout>
  )
}
