"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { JobSeekerStepLayout, RepeatableCertificationForm, manualSteps } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
export default function JobSeekerCertificationStep() { const router = useRouter(); const [showErrors, setShowErrors] = useState(false); return <JobSeekerStepLayout step={10} steps={manualSteps} description="Have you earned any certifications?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/job-seeker/step-9"><ArrowLeft /></Link></Button><Button type="submit" form="job-certifications">Go to Era</Button></>}><form id="job-certifications" noValidate onSubmit={(event) => { const form = event.currentTarget; const hasMissingInput = Array.from(form.elements).some((element) => element instanceof HTMLInputElement && element.required && !element.value.trim()); if (hasMissingInput) { event.preventDefault(); setShowErrors(true); return } event.preventDefault(); router.push("/dashboard") }}><RepeatableCertificationForm showErrors={showErrors} /></form></JobSeekerStepLayout> }
