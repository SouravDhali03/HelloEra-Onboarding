"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { SellerStepLayout, sellerFormats } from "@/components/seller-onboarding"
import { OptionCards } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"

export default function SellerFormatStep() {
  const router = useRouter()
  const [format, setFormat] = useState("")

  return (
    <SellerStepLayout
      step={1}
      description="How do you want to sell?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding">
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="seller-format" disabled={!format}>
            Continue
          </Button>
        </>
      }
    >
      <form
        id="seller-format"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(
            `/onboarding/seller/step-2?format=${encodeURIComponent(format)}`
          )
        }}
      >
        <OptionCards
          options={sellerFormats}
          value={format}
          onChange={setFormat}
        />
      </form>
    </SellerStepLayout>
  )
}
