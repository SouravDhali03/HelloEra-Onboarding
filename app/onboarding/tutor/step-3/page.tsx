"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { DurationChips, TutorStepLayout } from "@/components/tutor-onboarding"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"

const durations = ["50 Minutes", "1 hr", "2 hr", "Based on need"]

export default function TutorDurationStep() {
  const router = useRouter()
  const [duration, setDuration] = useState("")
  return <TutorStepLayout step={3} description="What's your typical lesson length?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/tutor/step-2"><ArrowLeft /></Link></Button><Button type="submit" form="tutor-duration" disabled={!duration}>Continue</Button></>}>
    <form id="tutor-duration" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/tutor/step-4") }}><Field><DurationChips options={durations} value={duration} onChange={setDuration} /></Field></form>
  </TutorStepLayout>
}
