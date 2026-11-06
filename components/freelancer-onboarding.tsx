"use client"

import { OnboardingShell } from "@/components/onboarding-shell"

export const freelancerSteps = ["Bio", "Services", "Skills", "Education", "Language", "Rate"]

export const freelancerCategories = [
  "Graphics & Design",
  "Admin Support",
  "Customer Support",
  "Engineering & Architecture",
  "IT & Networking",
  "Software Development",
]

export const freelancerSpecialties: Record<string, string[]> = {
  "Graphics & Design": ["AI Art", "Game Design", "Product Design", "UX/UI Design", "Logo Design"],
  "Admin Support": ["Data Entry", "Virtual Assistance", "Web Research", "Project Management"],
  "Customer Support": ["Email Support", "Chat Support", "Technical Support", "Customer Success"],
  "Engineering & Architecture": ["3D Modeling", "CAD Design", "Architecture Design", "Civil Engineering"],
  "IT & Networking": ["Network Administration", "Cybersecurity", "Cloud Computing", "DevOps"],
  "Software Development": ["Web Development", "Mobile App Development", "WordPress", "E-commerce Development", "QA Testing"],
}

const categorySkills: Record<string, string[]> = {
  "Graphics & Design": ["Adobe Photoshop", "Figma", "Illustration", "Brand Identity", "Prototyping"],
  "Admin Support": ["Microsoft Excel", "Google Workspace", "Calendar Management", "Data Processing", "Notion"],
  "Customer Support": ["Zendesk", "CRM", "Problem Solving", "Live Chat", "Communication"],
  "Engineering & Architecture": ["AutoCAD", "SolidWorks", "SketchUp", "Technical Drawing", "3D Rendering"],
  "IT & Networking": ["Linux", "AWS", "Network Security", "Python", "System Administration"],
  "Software Development": ["JavaScript", "React", "Node.js", "TypeScript", "API Development"],
}

const specialtySkills: Record<string, string[]> = {
  "AI Art": ["Prompt Engineering", "Generative AI", "Midjourney"],
  "Game Design": ["Unity", "Unreal Engine", "3D Animation"],
  "Product Design": ["Design Systems", "User Research", "Wireframing"],
  "Web Development": ["Next.js", "HTML", "CSS"],
  "Mobile App Development": ["React Native", "Flutter", "iOS Development"],
  Cybersecurity: ["Penetration Testing", "Security Auditing", "SOC"],
  DevOps: ["Docker", "Kubernetes", "CI/CD"],
}

export function getFreelancerSkillSuggestions(category: string, specialties: string[]) {
  return [...new Set([
    ...(categorySkills[category] ?? []),
    ...specialties.flatMap((specialty) => specialtySkills[specialty] ?? []),
  ])]
}

export function FreelancerStepLayout({ step, description, children, actions }: { step: number; description: string; children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <OnboardingShell progress={step} progressSteps={freelancerSteps}>
      <div className="w-full max-w-[28rem]">
        <div className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">Step {step} of {freelancerSteps.length}</p>
          <h1 className="text-lg font-medium">{description}</h1>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">{actions}</div>
      </div>
    </OnboardingShell>
  )
}
