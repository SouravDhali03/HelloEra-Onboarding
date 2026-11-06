"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { StudentStepLayout } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const goals = ["Improve grades and exams", "Build practical skills", "Complete projects", "Learn for work", "Personal growth"]

export default function StudentGoalsPage() {
  const router = useRouter()
  const { role } = useParams<{ role: string }>()
  const [goal, setGoal] = useState("")
  return <StudentStepLayout step={3} description="Why are you learning and where do you want to begin?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href={`/onboarding/${role}/step-2`}><ArrowLeft data-icon="inline-start" /></Link></Button><Button type="submit" form="student-goals" disabled={!goal}>Continue</Button></>}>
    <form id="student-goals" onSubmit={(event) => { event.preventDefault(); router.push(`/onboarding/${role}/step-4`) }}>
      <RadioGroup value={goal} onValueChange={setGoal} className="gap-2">{goals.map((option) => <label key={option} htmlFor={option} className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm hover:bg-muted/40"><RadioGroupItem id={option} value={option} /><span>{option}</span></label>)}</RadioGroup>
    </form>
  </StudentStepLayout>
}
