"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { TutorStepLayout } from "@/components/tutor-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const experienceOptions = ["1 year", "1–2 years", "More than 3 years"]

export default function TutorExperienceStep() {
  const router = useRouter()
  const [experience, setExperience] = useState("")
  return <TutorStepLayout step={4} description="How many years of teaching experience do you have?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/tutor/step-3"><ArrowLeft /></Link></Button><Button type="submit" form="tutor-experience" disabled={!experience}>Continue</Button></>}>
    <form id="tutor-experience" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/tutor/step-5") }}><Field><FieldLabel htmlFor="experience">Teaching experience</FieldLabel><Select value={experience} onValueChange={setExperience}><SelectTrigger id="experience" className="w-full"><SelectValue placeholder="Select experience" /></SelectTrigger><SelectContent position="popper">{experienceOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field></form>
  </TutorStepLayout>
}
