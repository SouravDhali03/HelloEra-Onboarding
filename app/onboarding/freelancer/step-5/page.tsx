"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { FreelancerStepLayout } from "@/components/freelancer-onboarding"
import { MultiSelectField } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"

const languageSuggestions = [
  "English",
  "বাংলা",
  "Español",
  "Français",
  "Deutsch",
  "हिन्दी",
  "العربية",
]

export default function FreelancerLanguageStep() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  return (
    <FreelancerStepLayout
      step={5}
      description="What languages do you speak?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/freelancer/step-4">
              <ArrowLeft />
            </Link>
          </Button>
          <Button
            type="submit"
            form="freelancer-language"
            disabled={!selected.length}
          >
            Continue
          </Button>
        </>
      }
    >
      <form
        id="freelancer-language"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/onboarding/freelancer/step-6")
        }}
      >
        <MultiSelectField
          label="Languages"
          placeholder="Search or add a language"
          suggestions={languageSuggestions}
          selected={selected}
          onChange={setSelected}
        />
      </form>
    </FreelancerStepLayout>
  )
}
