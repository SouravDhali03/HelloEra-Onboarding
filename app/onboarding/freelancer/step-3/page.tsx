"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense, useState } from "react"
import { ArrowLeft } from "lucide-react"

import {
  FreelancerStepLayout,
  getFreelancerSkillSuggestions,
} from "@/components/freelancer-onboarding"
import { MultiSelectField } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"

function FreelancerSkillsStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category") ?? "Graphics & Design"
  const specialties =
    searchParams.get("specialties")?.split("|").filter(Boolean) ?? []
  const [selected, setSelected] = useState<string[]>([])
  const suggestions = getFreelancerSkillSuggestions(category, specialties)
  return (
    <FreelancerStepLayout
      step={3}
      description="What skills do you bring to the service you offer?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link
              href={`/onboarding/freelancer/step-2?category=${encodeURIComponent(category)}`}
            >
              <ArrowLeft />
            </Link>
          </Button>
          <Button
            type="submit"
            form="freelancer-skills"
            disabled={!selected.length}
          >
            Continue
          </Button>
        </>
      }
    >
      <form
        id="freelancer-skills"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding/freelancer/step-4")
        }}
      >
        <MultiSelectField
          label="Skills"
          placeholder="Search or add a skill"
          suggestions={suggestions}
          selected={selected}
          onChange={setSelected}
        />
      </form>
    </FreelancerStepLayout>
  )
}

export default function FreelancerSkillsStep() {
  return (
    <Suspense fallback={null}>
      <FreelancerSkillsStepContent />
    </Suspense>
  )
}
