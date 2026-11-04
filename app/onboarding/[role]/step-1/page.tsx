"use client"

import { useParams, useRouter } from "next/navigation"

import { OnboardingShell } from "@/components/onboarding-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const prompts: Record<string, { title: string; description: string; label: string; placeholder: string }> = {
  student: { title: "Tell us about your learning", description: "What would you like to focus on first?", label: "Learning interest", placeholder: "e.g. Design, coding, languages" },
  "job-seeker": { title: "Tell us about your career", description: "This helps us personalize opportunities for you.", label: "Target role", placeholder: "e.g. Product designer" },
  freelancer: { title: "Tell us about your work", description: "Help clients understand what you do best.", label: "Primary skill", placeholder: "e.g. Web development" },
  tutor: { title: "Tell us about your teaching", description: "Start with the subject you know best.", label: "Subject you teach", placeholder: "e.g. Mathematics" },
  seller: { title: "Tell us about your store", description: "Start by describing what you plan to sell.", label: "Store category", placeholder: "e.g. Handmade goods" },
}

export default function RoleStepOnePage() {
  const router = useRouter()
  const { role } = useParams<{ role: string }>()
  const prompt = prompts[role] ?? prompts.student

  return (
    <OnboardingShell>
      <Card className="w-full max-w-[28rem] shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-2xl">{prompt.title}</CardTitle>
          <CardDescription>{prompt.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={(event) => { event.preventDefault(); router.push(`/onboarding/${role}/step-2`) }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="onboarding-answer">{prompt.label}</FieldLabel>
                <Input id="onboarding-answer" placeholder={prompt.placeholder} required />
              </Field>
            </FieldGroup>
            <Button type="submit" size="lg" className="w-full">Continue</Button>
          </form>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button type="button" variant="ghost" className="w-full" onClick={() => router.push(`/onboarding/${role}`)}>Back</Button>
        </CardFooter>
      </Card>
    </OnboardingShell>
  )
}
