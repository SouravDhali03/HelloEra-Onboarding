"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import {
  JobSeekerMultiSelect,
  JobSeekerStepLayout,
} from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"

const suggestions = [
  "Product designer",
  "Front-end developer",
  "Banker",
  "DevOps",
  "Human resource management",
  "Finance",
]
export default function JobSeekerRoleStep() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  return (
    <JobSeekerStepLayout
      step={1}
      description="What opportunity are you looking for?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="job-role" disabled={!selected.length}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="job-role"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding/job-seeker/step-2")
        }}
      >
        <JobSeekerMultiSelect
          label="Opportunity categories"
          placeholder="Search or add a category"
          suggestions={suggestions}
          selected={selected}
          onChange={setSelected}
        />
      </form>
    </JobSeekerStepLayout>
  )
}
