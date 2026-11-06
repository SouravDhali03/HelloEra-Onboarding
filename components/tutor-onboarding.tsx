"use client"

import { Plus, X } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding-shell"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const tutorSteps = ["Subjects", "Format", "Duration", "Experience", "Education", "Bio"]

export const tutorSubjectSuggestions = ["Class 1–5", "Class 6–10", "Bangla", "English", "Higher Math", "Physics", "Chemistry", "Biology"]

export function TutorStepLayout({ step, description, children, actions }: { step: number; description: string; children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <OnboardingShell progress={step} progressSteps={tutorSteps}>
      <div className="w-full max-w-[28rem]">
        <div className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">Step {step} of {tutorSteps.length}</p>
          <h1 className="text-lg font-medium">{description}</h1>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">{actions}</div>
      </div>
    </OnboardingShell>
  )
}

export function DurationChips({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <ToggleGroup type="single" variant="outline" value={value} onValueChange={onChange} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const Icon = value === option ? X : Plus
        return <ToggleGroupItem key={option} value={option} className="h-8 rounded-full px-3 text-xs"><span>{option}</span><Icon data-icon="inline-end" aria-hidden="true" /></ToggleGroupItem>
      })}
    </ToggleGroup>
  )
}
