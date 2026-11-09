"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import {
  JobSeekerStepLayout,
  OptionCards,
} from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
const options = ["Remote", "Onsite", "Remote and onsite"]
export default function JobSeekerWorkplaceStep() {
  const router = useRouter()
  const [value, setValue] = useState("")
  return (
    <JobSeekerStepLayout
      step={2}
      description="What is your preferred workplace type?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/job-seeker/step-1">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="job-workplace" disabled={!value}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="job-workplace"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding/job-seeker/step-3")
        }}
      >
        <OptionCards options={options} value={value} onChange={setValue} />
      </form>
    </JobSeekerStepLayout>
  )
}
