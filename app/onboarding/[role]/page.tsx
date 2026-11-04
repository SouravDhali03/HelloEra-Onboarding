"use client"

import { useParams } from "next/navigation"
import { ArrowRight, BookOpen, BriefcaseBusiness, GraduationCap, Laptop, Store } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const onboardingSteps: Record<string, { label: string; description: string; icon: typeof GraduationCap; steps: string[] }> = {
  student: { label: "Student", description: "Tell us what you want to learn and where you are headed.", icon: GraduationCap, steps: ["Your interests", "Your education", "Your goals"] },
  "job-seeker": { label: "Job seeker", description: "Build a profile that helps you find the right opportunity.", icon: BriefcaseBusiness, steps: ["Professional profile", "Experience", "Job preferences"] },
  freelancer: { label: "Freelancer", description: "Set up your services so clients can discover your work.", icon: Laptop, steps: ["Your skills", "Portfolio", "Availability"] },
  tutor: { label: "Tutor", description: "Create a trusted teaching profile for your learners.", icon: BookOpen, steps: ["Subjects", "Teaching experience", "Availability"] },
  seller: { label: "Seller", description: "Prepare your storefront and start reaching customers.", icon: Store, steps: ["Store details", "What you sell", "Payout setup"] },
}

export default function RoleOnboardingPage() {
  const { role } = useParams<{ role: string }>()
  const onboarding = onboardingSteps[role] ?? onboardingSteps.student
  const Icon = onboarding.icon

  return (
    <OnboardingShell>
      <Card className="w-full max-w-[28rem] shadow-lg shadow-primary/5">
        <CardHeader className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon /></div>
          <CardTitle className="text-2xl">Welcome, {onboarding.label.toLowerCase()}!</CardTitle>
          <CardDescription>{onboarding.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {onboarding.steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 text-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button asChild size="lg" className="w-full">
            <a href={`/onboarding/${role}/step-1`}>Start onboarding <ArrowRight data-icon="inline-end" /></a>
          </Button>
          <Button asChild variant="ghost" className="w-full"><a href="/onboarding">Choose another role</a></Button>
        </CardFooter>
      </Card>
    </OnboardingShell>
  )
}
