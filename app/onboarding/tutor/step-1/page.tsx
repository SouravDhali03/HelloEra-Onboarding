"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { MultiSelectField } from "@/components/student-onboarding"
import { TutorStepLayout, tutorSubjectSuggestions } from "@/components/tutor-onboarding"
import { Button } from "@/components/ui/button"

export default function TutorSubjectsStep() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  return <TutorStepLayout step={1} description="What do you teach?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding"><ArrowLeft /></Link></Button><Button type="submit" form="tutor-subjects" disabled={!selected.length}>Continue</Button></>}>
    <form id="tutor-subjects" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/tutor/step-2") }}><MultiSelectField label="Subjects" placeholder="Search or add a subject" suggestions={tutorSubjectSuggestions} selected={selected} onChange={setSelected} /></form>
  </TutorStepLayout>
}
