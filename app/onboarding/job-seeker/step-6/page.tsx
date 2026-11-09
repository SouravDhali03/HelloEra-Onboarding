"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import {
  JobSeekerStepLayout,
  OptionCards,
  manualSteps,
} from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
const options = ["Upload CV", "Build manually"]
export default function JobSeekerSetupStep() {
  const router = useRouter()
  const [value, setValue] = useState("")
  return (
    <JobSeekerStepLayout
      step={6}
      steps={manualSteps}
      description="How do you like to build your profile?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/job-seeker/step-5">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="job-setup" disabled={!value}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="job-setup"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(
            value === "Upload CV"
              ? "/onboarding/job-seeker/upload-cv"
              : "/onboarding/job-seeker/step-7"
          )
        }}
      >
        <OptionCards options={options} value={value} onChange={setValue} />
      </form>
    </JobSeekerStepLayout>
  )
}
