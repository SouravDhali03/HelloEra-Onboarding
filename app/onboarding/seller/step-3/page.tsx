"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { ArrowLeft, Building2, Link as LinkIcon } from "lucide-react"

import { SellerStepLayout } from "@/components/seller-onboarding"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

function SellerStoreStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const format = searchParams.get("format") ?? ""
  const categories = searchParams.get("categories") ?? ""
  const [storeName, setStoreName] = useState("")
  const [website, setWebsite] = useState("")
  const [showErrors, setShowErrors] = useState(false)
  const nextQuery = `format=${encodeURIComponent(format)}&categories=${encodeURIComponent(categories)}`

  return (
    <SellerStepLayout
      step={3}
      description="Tell us about your store."
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link
              href={`/onboarding/seller/step-2?format=${encodeURIComponent(format)}`}
            >
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="seller-store">
            Continue
          </Button>
        </>
      }
    >
      <form
        id="seller-store"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          if (!storeName.trim()) {
            setShowErrors(true)
            return
          }
          router.push(`/onboarding/seller/step-4?${nextQuery}`)
        }}
      >
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="store-name">Store name</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Building2 aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="store-name"
                name="storeName"
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
                placeholder="Your store name"
                required
              />
            </InputGroup>
            {showErrors && !storeName.trim() ? (
              <FieldError>Please enter your store name.</FieldError>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="store-website">Website</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <LinkIcon aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="store-website"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                type="url"
                placeholder="https://example.com"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </form>
    </SellerStepLayout>
  )
}

export default function SellerStoreStep() {
  return (
    <Suspense fallback={null}>
      <SellerStoreStepContent />
    </Suspense>
  )
}
