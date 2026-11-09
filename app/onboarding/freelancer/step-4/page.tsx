"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { FreelancerStepLayout } from "@/components/freelancer-onboarding"
import { RepeatableEducationForm } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"

export default function FreelancerEducationStep() {
  const router = useRouter()
  const [showErrors, setShowErrors] = useState(false)
  return (
    <FreelancerStepLayout
      step={4}
      description="Tell us about your education."
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/freelancer/step-3">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="freelancer-education">
            Continue
          </Button>
        </>
      }
    >
      <form
        id="freelancer-education"
        noValidate
        onSubmit={(event) => {
          const form = event.currentTarget
          const hasMissingInput = Array.from(form.elements).some(
            (element) =>
              (element instanceof HTMLInputElement ||
                element instanceof HTMLSelectElement) &&
              element.required &&
              !element.value.trim()
          )
          if (hasMissingInput) {
            event.preventDefault()
            setShowErrors(true)
            return
          }
          event.preventDefault()
          router.push("/onboarding/freelancer/step-5")
        }}
      >
        <RepeatableEducationForm showErrors={showErrors} />
      </form>
    </FreelancerStepLayout>
  )
}
