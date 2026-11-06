"use client"

import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Laptop,
  Store,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "cn"
import { OnboardingShell } from "@/components/onboarding-shell"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const roles = [
  { slug: "student", label: "Student", icon: GraduationCap },
  { slug: "job-seeker", label: "Job seeker", icon: BriefcaseBusiness },
  { slug: "freelancer", label: "Freelancer", icon: Laptop },
  { slug: "tutor", label: "Tutor", icon: BookOpen },
  { slug: "seller", label: "Seller", icon: Store },
]

export default function OnboardingPage() {
  const router = useRouter()

  function handleRoleChange(role: string) {
    if (role) {
      const storedRoles = document.cookie.split("; ").find((cookie) => cookie.startsWith("era-roles="))?.split("=")[1]?.split(",").filter(Boolean) ?? []
      const roles = Array.from(new Set([...storedRoles, role]))
      document.cookie = `era-roles=${roles.join(",")}; path=/; max-age=${60 * 60 * 24 * 30}`
      document.cookie = `era-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}`
      router.push(`/onboarding/${role}/step-1`)
    }
  }

  return (
    <OnboardingShell>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-medium">How will you use Era?</h1>
          <p className="text-sm text-muted-foreground">Choose a role to personalize your onboarding experience.</p>
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          value=""
          onValueChange={handleRoleChange}
          className="grid w-full grid-cols-6 gap-3"
        >
          {roles.map(({ slug, label, icon: Icon }, index) => (
            <ToggleGroupItem
              key={slug}
              value={slug}
              aria-label={label}
              variant="outline"
              className={cn(
                "col-span-2 h-24 w-full flex-col justify-center gap-2 rounded-2xl p-3 text-center",
                index === 3 && "col-start-2"
              )}
            >
              <Icon />
              <span className="font-medium">{label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </OnboardingShell>
  )
}
