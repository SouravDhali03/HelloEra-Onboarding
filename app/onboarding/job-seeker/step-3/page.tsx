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
  "Dhaka",
  "Chattogram",
  "Remote",
  "New York",
  "London",
  "Singapore",
]
export default function JobSeekerLocationStep() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  return (
    <JobSeekerStepLayout
      step={3}
      description="What is your preferred workplace location?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/job-seeker/step-2">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="job-location" disabled={!selected.length}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="job-location"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding/job-seeker/step-4")
        }}
      >
        <JobSeekerMultiSelect
          label="Workplace location"
          placeholder="Search for a city or region"
          suggestions={suggestions}
          selected={selected}
          onChange={setSelected}
        />
      </form>
    </JobSeekerStepLayout>
  )
}
