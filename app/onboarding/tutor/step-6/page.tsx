"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { TutorStepLayout } from "@/components/tutor-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function TutorBioStep() {
  const router = useRouter()
  return (
    <TutorStepLayout
      step={6}
      description="How would you like to describe yourself?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/tutor/step-5">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="tutor-bio">
            Go to Era
          </Button>
        </>
      }
    >
      <form
        id="tutor-bio"
        onSubmit={(event) => {
          event.preventDefault()
          router.push("/dashboard")
        }}
      >
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell learners about yourself"
          />
          <FieldDescription>
            Highlight your teaching experience, what you teach, and how you can
            help learners.
          </FieldDescription>
        </Field>
      </form>
    </TutorStepLayout>
  )
}
