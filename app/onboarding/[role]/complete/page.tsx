import { CheckCircle2 } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding-shell"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentOnboardingCompletePage() {
  return <OnboardingShell><Card className="w-full max-w-[28rem] text-center shadow-lg shadow-primary/5"><CardHeader><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><CheckCircle2 /></div><CardTitle className="text-2xl">You&apos;re all set</CardTitle><CardDescription>Your student profile is ready. Welcome to Era!</CardDescription></CardHeader><CardFooter><Button asChild className="w-full"><a href="/onboarding">Go to Era</a></Button></CardFooter></Card></OnboardingShell>
}
