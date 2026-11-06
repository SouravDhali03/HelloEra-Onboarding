import type { ReactNode } from "react"

const roles = ["freelancer", "job-seeker", "seller", "student", "tutor"]

export function generateStaticParams() {
  return roles.map((role) => ({ role }))
}

export default function RoleLayout({ children }: { children: ReactNode }) {
  return children
}
