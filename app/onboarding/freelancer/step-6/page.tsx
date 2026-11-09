"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { FreelancerStepLayout } from "@/components/freelancer-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function FreelancerRateStep() {
  const router = useRouter()
  return (
    <FreelancerStepLayout
      step={6}
      description="Let’s set your hourly rate."
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/freelancer/step-5">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="freelancer-rate">
            Go to Era
          </Button>
        </>
      }
    >
      <form
        id="freelancer-rate"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/dashboard")
        }}
      >
        <Field>
          <FieldLabel htmlFor="hourly-rate">Hourly rate</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">$</InputGroupAddon>
            <InputGroupInput
              id="hourly-rate"
              name="hourlyRate"
              type="text"
              inputMode="decimal"
              placeholder="25"
              required
            />
          </InputGroup>
          <FieldDescription>
            This is the total hourly amount clients will see.
          </FieldDescription>
        </Field>
      </form>
    </FreelancerStepLayout>
  )
}
