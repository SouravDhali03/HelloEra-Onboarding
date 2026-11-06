"use client"

import { OnboardingShell } from "@/components/onboarding-shell"

export const sellerSteps = ["Format", "Category", "Store", "Address", "Experience", "Profile"]

export const sellerFormats = ["Physical", "Digital", "Services", "Multiple"]

export const sellerCategories: Record<string, string[]> = {
  Physical: ["Clothing & Fashion", "Electronics", "Home & Lifestyle", "Beauty & Personal Care", "Handmade Products", "Food & Beverage"],
  Digital: ["Templates", "Ebooks", "Online Courses", "Software", "Music & Audio", "Digital Art"],
  Services: ["Design", "Tutoring", "Consulting", "Writing", "Marketing", "Photography"],
}

export const sellerExperienceOptions = ["I’m just getting started", "Less than 1 year", "1–3 years", "More than 3 years"]

export function getSellerCategorySuggestions(format: string) {
  if (format === "Multiple") return [...new Set(sellerFormats.filter((item) => item !== "Multiple").flatMap((item) => sellerCategories[item]))]
  return sellerCategories[format] ?? []
}

export function SellerStepLayout({ step, description, children, actions }: { step: number; description: string; children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <OnboardingShell progress={step} progressSteps={sellerSteps}>
      <div className="w-full max-w-[28rem]">
        <div className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">Step {step} of {sellerSteps.length}</p>
          <h1 className="text-lg font-medium">{description}</h1>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">{actions}</div>
      </div>
    </OnboardingShell>
  )
}
