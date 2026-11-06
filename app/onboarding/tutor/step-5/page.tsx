"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { RepeatableEducationForm } from "@/components/job-seeker-onboarding"
import { TutorStepLayout } from "@/components/tutor-onboarding"
import { Button } from "@/components/ui/button"

export default function TutorEducationStep() {
  const router = useRouter()
  const [showErrors, setShowErrors] = useState(false)
  return <TutorStepLayout step={5} description="Tell us about your education." actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/tutor/step-4"><ArrowLeft /></Link></Button><Button type="submit" form="tutor-education">Continue</Button></>}>
    <form id="tutor-education" noValidate onSubmit={(event) => { const form = event.currentTarget; const hasMissingInput = Array.from(form.elements).some((element) => ((element instanceof HTMLInputElement || element instanceof HTMLSelectElement) && element.required && !element.value.trim())); if (hasMissingInput) { event.preventDefault(); setShowErrors(true); return } event.preventDefault(); router.push("/onboarding/tutor/step-6") }}><RepeatableEducationForm showErrors={showErrors} /></form>
  </TutorStepLayout>
}
