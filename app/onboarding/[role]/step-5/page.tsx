"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { MultiSelectField, StudentStepLayout } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"

const suggestions = ["English", "বাংলা", "Español", "Français", "Deutsch", "हिन्दी", "العربية"]

export default function StudentLanguagePage() {
  const router = useRouter()
  const { role } = useParams<{ role: string }>()
  const [selected, setSelected] = useState<string[]>([])
  return <StudentStepLayout step={5} description="What is your preferred language?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><a href={`/onboarding/${role}/step-4`}><ArrowLeft data-icon="inline-start" /></a></Button><Button type="submit" form="student-language" disabled={!selected.length}>Finish onboarding</Button></>}>
    <form id="student-language" onSubmit={(event) => { event.preventDefault(); router.push(`/onboarding/${role}/complete`) }}>
      <MultiSelectField label="Languages" placeholder="Search or add a language" suggestions={suggestions} selected={selected} onChange={setSelected} />
    </form>
  </StudentStepLayout>
}
