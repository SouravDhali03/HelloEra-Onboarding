"use client"

import { OnboardingStepLayout } from "@/components/onboarding-step-layout"

export const sellerSteps = [
  "Format",
  "Category",
  "Store",
  "Address",
  "Experience",
  "Profile",
]

export const sellerFormats = ["Physical", "Digital", "Services", "Multiple"]

export const sellerCategories: Record<string, string[]> = {
  Physical: [
    "Clothing & Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Beauty & Personal Care",
    "Handmade Products",
    "Food & Beverage",
  ],
  Digital: [
    "Templates",
    "Ebooks",
    "Online Courses",
    "Software",
    "Music & Audio",
    "Digital Art",
  ],
  Services: [
    "Design",
    "Tutoring",
    "Consulting",
    "Writing",
    "Marketing",
    "Photography",
  ],
}

export const sellerExperienceOptions = [
  "I’m just getting started",
  "Less than 1 year",
  "1–3 years",
  "More than 3 years",
]

export function getSellerCategorySuggestions(format: string) {
  if (format === "Multiple")
    return [
      ...new Set(
        sellerFormats
          .filter((item) => item !== "Multiple")
          .flatMap((item) => sellerCategories[item])
      ),
    ]
  return sellerCategories[format] ?? []
}

export function SellerStepLayout({
  step,
  description,
  children,
  actions,
}: {
  step: number
  description: string
  children: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <OnboardingStepLayout
      step={step}
      totalSteps={sellerSteps.length}
      description={description}
      actions={actions}
      progressSteps={sellerSteps}
    >
      {children}
    </OnboardingStepLayout>
  )
}
