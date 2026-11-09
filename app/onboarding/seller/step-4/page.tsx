"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { ArrowLeft, Mail, MapPin, Road } from "lucide-react"

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

function SellerAddressStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const format = searchParams.get("format") ?? ""
  const categories = searchParams.get("categories") ?? ""
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [road, setRoad] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [showErrors, setShowErrors] = useState(false)
  const query = `format=${encodeURIComponent(format)}&categories=${encodeURIComponent(categories)}`

  return (
    <SellerStepLayout
      step={4}
      description="Where is your shop located?"
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href={`/onboarding/seller/step-3?${query}`}>
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="seller-address">
            Continue
          </Button>
        </>
      }
    >
      <form
        id="seller-address"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          if (!address.trim() || !city.trim() || !road.trim()) {
            setShowErrors(true)
            return
          }
          router.push(`/onboarding/seller/step-5?${query}`)
        }}
      >
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="store-address">Full address</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <MapPin aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="store-address"
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="House and street address"
                required
              />
            </InputGroup>
            {showErrors && !address.trim() ? (
              <FieldError>Please enter your full address.</FieldError>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="store-city">City</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <MapPin aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="store-city"
                name="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="City"
                required
              />
            </InputGroup>
            {showErrors && !city.trim() ? (
              <FieldError>Please enter your city.</FieldError>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="store-road">Road or area</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Road aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="store-road"
                name="road"
                value={road}
                onChange={(event) => setRoad(event.target.value)}
                placeholder="Road, area, or neighborhood"
                required
              />
            </InputGroup>
            {showErrors && !road.trim() ? (
              <FieldError>Please enter your road or area.</FieldError>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="store-postal-code">Postal code</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Mail aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="store-postal-code"
                name="postalCode"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="Postal code"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </form>
    </SellerStepLayout>
  )
}

export default function SellerAddressStep() {
  return (
    <Suspense fallback={null}>
      <SellerAddressStepContent />
    </Suspense>
  )
}
