"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { ArrowLeft } from "lucide-react"

import { SellerStepLayout, getSellerCategorySuggestions } from "@/components/seller-onboarding"
import { MultiSelectField } from "@/components/student-onboarding"
import { Button } from "@/components/ui/button"

function SellerCategoryStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const format = searchParams.get("format") ?? ""
  const [selected, setSelected] = useState<string[]>([])
  const suggestions = getSellerCategorySuggestions(format)
  const formatQuery = encodeURIComponent(format)

  return <SellerStepLayout step={2} description="What do you sell?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/seller/step-1"><ArrowLeft /></Link></Button><Button type="submit" form="seller-category" disabled={!selected.length}>Continue</Button></>}>
    <form id="seller-category" onSubmit={(event) => { event.preventDefault(); router.push(`/onboarding/seller/step-3?format=${formatQuery}&categories=${encodeURIComponent(selected.join("|"))}`) }}>
      <MultiSelectField label="Category" placeholder="Search or add a category" suggestions={suggestions} selected={selected} onChange={setSelected} />
    </form>
  </SellerStepLayout>
}

export default function SellerCategoryStep() {
  return <Suspense fallback={null}><SellerCategoryStepContent /></Suspense>
}
