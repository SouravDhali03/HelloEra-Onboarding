"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { StudentStepLayout } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const levels = ["Primary school student", "Higher school student", "College student", "University student", "Independent learner", "Professional upskilling"]

export default function RoleStepOnePage() {
  const router = useRouter()
  const { role } = useParams<{ role: string }>()
  const [level, setLevel] = useState("")

  return (
    <StudentStepLayout step={1} description="What education setting describes you most?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><a href="/onboarding"><ArrowLeft data-icon="inline-start" /></a></Button><Button type="submit" form="student-level" disabled={!level}>Continue</Button></>}>
      <form id="student-level" onSubmit={(event) => { event.preventDefault(); router.push(`/onboarding/${role}/step-2`) }}>
        <RadioGroup value={level} onValueChange={setLevel} className="gap-2">
          {levels.map((option) => <label key={option} htmlFor={option} className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm hover:bg-muted/40"><RadioGroupItem id={option} value={option} /><span>{option}</span></label>)}
        </RadioGroup>
      </form>
    </StudentStepLayout>
  )
}
