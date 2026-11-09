"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import {
  FreelancerStepLayout,
  freelancerCategories,
  freelancerSpecialties,
} from "@/components/freelancer-onboarding"
import { SuggestionChips } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FreelancerServicesStep() {
  const router = useRouter()
  const [category, setCategory] = useState(freelancerCategories[0])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const options = freelancerSpecialties[category] ?? []
  return (
    <FreelancerStepLayout
      step={2}
      description="What kind of work are you here to do?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/freelancer/step-1">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="freelancer-services">
            Continue
          </Button>
        </>
      }
    >
      <form
        id="freelancer-services"
        onSubmit={(event) => {
          event.preventDefault()
          if (!specialties.length) {
            setShowErrors(true)
            return
          }
          router.push(
            `/onboarding/freelancer/step-3?category=${encodeURIComponent(category)}&specialties=${encodeURIComponent(specialties.join("|"))}`
          )
        }}
      >
        <div className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value)
                setSpecialties([])
              }}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {freelancerCategories.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Specialties</FieldLabel>
            <SuggestionChips
              suggestions={options}
              selected={specialties}
              onChange={setSpecialties}
            />
            {showErrors && !specialties.length ? (
              <FieldError>Please select at least one specialty.</FieldError>
            ) : null}
          </Field>
        </div>
      </form>
    </FreelancerStepLayout>
  )
}
