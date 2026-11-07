"use client"

import { OnboardingShell } from "@/components/onboarding-shell"

type OnboardingStepLayoutProps = {
  step: number
  totalSteps: number
  description: string
  children: React.ReactNode
  actions: React.ReactNode
  progressSteps: string[]
}

export function OnboardingStepLayout({
  step,
  totalSteps,
  description,
  children,
  actions,
  progressSteps,
}: OnboardingStepLayoutProps) {
  return (
    <OnboardingShell progress={step} progressSteps={progressSteps}>
      <section
        data-slot="onboarding-step"
        className="w-full max-w-[28rem]"
        aria-labelledby="onboarding-step-title"
      >
        <header data-slot="onboarding-step-header" className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
          <h1 id="onboarding-step-title" className="text-lg font-medium">
            {description}
          </h1>
        </header>
        <div data-slot="onboarding-step-content">{children}</div>
        <footer
          data-slot="onboarding-step-actions"
          className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between"
        >
          {actions}
        </footer>
      </section>
    </OnboardingShell>
  )
}
