"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { SellerStepLayout, sellerExperienceOptions } from "@/components/seller-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerExperienceStep() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const format = searchParams.get("format") ?? ""
  const categories = searchParams.get("categories") ?? ""
  const [experience, setExperience] = useState("")
  const query = `format=${encodeURIComponent(format)}&categories=${encodeURIComponent(categories)}`

  return <SellerStepLayout step={5} description="How long have you been selling?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href={`/onboarding/seller/step-4?${query}`}><ArrowLeft /></Link></Button><Button type="submit" form="seller-experience" disabled={!experience}>Continue</Button></>}>
    <form id="seller-experience" onSubmit={(event) => { event.preventDefault(); router.push(`/onboarding/seller/step-6?${query}`) }}><Field><FieldLabel htmlFor="experience">Experience</FieldLabel><Select value={experience} onValueChange={setExperience}><SelectTrigger id="experience" className="w-full"><SelectValue placeholder="Select experience" /></SelectTrigger><SelectContent position="popper">{sellerExperienceOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field></form>
  </SellerStepLayout>
}
