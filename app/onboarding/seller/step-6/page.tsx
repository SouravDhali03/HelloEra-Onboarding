"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useRef, useState } from "react"
import { ArrowLeft, FileImage, Upload, X } from "lucide-react"

import { SellerStepLayout } from "@/components/seller-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Textarea } from "@/components/ui/textarea"

function SellerProfileStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const format = searchParams.get("format") ?? ""
  const categories = searchParams.get("categories") ?? ""
  const query = `format=${encodeURIComponent(format)}&categories=${encodeURIComponent(categories)}`
  const [description, setDescription] = useState("")
  const [showErrors, setShowErrors] = useState(false)
  const [logo, setLogo] = useState<{ name: string; size: string } | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }

  function handleLogoChange(file: File | undefined) {
    setLogo(file ? { name: file.name, size: formatFileSize(file.size) } : null)
  }

  function removeLogo() {
    setLogo(null)
    if (logoInputRef.current) logoInputRef.current.value = ""
  }

  return (
    <SellerStepLayout
      step={6}
      description="Tell customers about your store."
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href={`/onboarding/seller/step-5?${query}`}>
              <ArrowLeft />
            </Link>
          </Button>
          <Button type="submit" form="seller-profile">
            Go to Era
          </Button>
        </>
      }
    >
      <form
        id="seller-profile"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          if (!description.trim()) {
            setShowErrors(true)
            return
          }
          router.push("/dashboard")
        }}
      >
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Logo</FieldLabel>
            {logo ? (
              <Attachment
                state="done"
                className="w-full animate-in duration-200 fade-in-0 slide-in-from-bottom-1 motion-reduce:animate-none"
              >
                <AttachmentMedia variant="icon">
                  <FileImage aria-hidden="true" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{logo.name}</AttachmentTitle>
                  <AttachmentDescription>{logo.size}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={removeLogo}
                    aria-label="Remove logo"
                  >
                    <X aria-hidden="true" />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="h-auto w-full animate-in flex-col gap-3 rounded-xl border-dashed p-6 text-center duration-200 fade-in-0 slide-in-from-bottom-1 motion-reduce:animate-none"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload aria-hidden="true" />
                <span className="text-sm font-medium">Upload logo</span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG, or WEBP
                </span>
              </Button>
            )}
            <input
              ref={logoInputRef}
              id="store-logo"
              name="logo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(event) => handleLogoChange(event.target.files?.[0])}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="store-description">
              Store description
            </FieldLabel>
            <Textarea
              id="store-description"
              name="storeDescription"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What should customers know about your store?"
              required
            />
            {showErrors && !description.trim() ? (
              <FieldError>
                Please enter a description for your store.
              </FieldError>
            ) : null}
          </Field>
        </div>
      </form>
    </SellerStepLayout>
  )
}

export default function SellerProfileStep() {
  return (
    <Suspense fallback={null}>
      <SellerProfileStepContent />
    </Suspense>
  )
}
