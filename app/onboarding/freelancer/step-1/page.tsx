"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { FreelancerStepLayout } from "@/components/freelancer-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function FreelancerBioStep() {
  const router = useRouter()
  return <FreelancerStepLayout step={1} description="How would you like to describe yourself?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding"><ArrowLeft /></Link></Button><Button type="submit" form="freelancer-bio">Continue</Button></>}>
    <form id="freelancer-bio" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/freelancer/step-2") }}>
      <Field><FieldLabel htmlFor="bio">Bio</FieldLabel><Textarea id="bio" name="bio" placeholder="Tell clients about yourself" /><FieldDescription>Highlight your creative work, what you do, and how you can help others.</FieldDescription></Field>
    </form>
  </FreelancerStepLayout>
}
