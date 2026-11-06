"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { JobSeekerStepLayout, RepeatableExperienceForm, manualSteps } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
export default function JobSeekerExperienceStep() { const router = useRouter(); const [showErrors, setShowErrors] = useState(false); return <JobSeekerStepLayout step={8} steps={manualSteps} description="Tell us about your experience." actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/job-seeker/step-7"><ArrowLeft /></Link></Button><Button type="submit" form="job-experience">Continue</Button></>}><form id="job-experience" noValidate onSubmit={(event) => { const form = event.currentTarget; const hasMissingInput = Array.from(form.elements).some((element) => ((element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) && element.required && !element.value.trim())); if (hasMissingInput) { event.preventDefault(); setShowErrors(true); return } event.preventDefault(); router.push("/onboarding/job-seeker/step-9") }}><RepeatableExperienceForm showErrors={showErrors} /></form></JobSeekerStepLayout> }
