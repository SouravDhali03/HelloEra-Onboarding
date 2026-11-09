"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import {
  MultiSelectField,
  StudentStepLayout,
} from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"

const suggestions = [
  "Mathematics",
  "Science",
  "Programming",
  "Design",
  "Languages",
  "Business",
  "Marketing",
]

export default function StudentInterestsPage() {
  const router = useRouter()
  const { role } = useParams<{ role: string }>()
  const [selected, setSelected] = useState<string[]>([])
  return (
    <StudentStepLayout
      step={2}
      description="Which subjects or skills do you want to learn or explore?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href={`/onboarding/${role}/step-1`}>
              <ArrowLeft data-icon="inline-start" />
            </Link>
          </Button>
          <Button
            type="submit"
            form="student-interests"
            disabled={!selected.length}
          >
            Continue
          </Button>
        </>
      }
    >
      <form
        id="student-interests"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(`/onboarding/${role}/step-3`)
        }}
      >
        <MultiSelectField
          label="Subjects or skills"
          placeholder="Search or add a skill"
          suggestions={suggestions}
          selected={selected}
          onChange={setSelected}
        />
      </form>
    </StudentStepLayout>
  )
}
