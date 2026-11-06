"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  GraduationCap,
  Laptop,
  LogOut,
  Plus,
  Store,
} from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const roleProfiles = [
  { slug: "student", label: "Student", icon: GraduationCap },
  { slug: "job-seeker", label: "Career / Job Seeker", icon: BriefcaseBusiness },
  { slug: "freelancer", label: "Freelancer", icon: Laptop },
  { slug: "tutor", label: "Tutor", icon: BookOpen },
  { slug: "seller", label: "Seller", icon: Store },
] as const

export function RoleAvatar({ role = "student", size = "default", className }: { role?: string; size?: "default" | "sm" | "lg"; className?: string }) {
  const profile = roleProfiles.find((item) => item.slug === role) ?? roleProfiles[0]
  const RoleIcon = profile.icon

  return (
    <Avatar size={size} className={className}>
      <AvatarFallback>S</AvatarFallback>
      <AvatarBadge><RoleIcon aria-hidden="true" /></AvatarBadge>
    </Avatar>
  )
}

function readCookie(name: string) {
  if (typeof document === "undefined") return ""
  return document.cookie.split("; ").find((cookie) => cookie.startsWith(`${name}=`))?.split("=")[1] ?? ""
}

function readRoleList() {
  return readCookie("era-roles").split(",").filter((role) => roleProfiles.some((profile) => profile.slug === role))
}

export function AccountMenu({
  align = "end",
  activeRole: initialActiveRole,
  roles: initialRoles,
  showRoleSwitcher = true,
}: {
  align?: "start" | "center" | "end"
  activeRole?: string
  roles?: string[]
  showRoleSwitcher?: boolean
}) {
  const [activeRole, setActiveRole] = useState(initialActiveRole ?? "student")
  const [roles, setRoles] = useState(initialRoles?.length ? initialRoles : ["student"])

  useEffect(() => {
    const storedRoles = readRoleList()
    const storedActiveRole = readCookie("era-role")
    const nextRoles = Array.from(new Set([...storedRoles, storedActiveRole])).filter((role) =>
      roleProfiles.some((profile) => profile.slug === role),
    )
    // The cookie is the source of truth for the client-only account menu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (nextRoles.length) setRoles(nextRoles)
    if (storedActiveRole) setActiveRole(storedActiveRole)
  }, [])

  function selectRole(role: string) {
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `era-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}`
    setActiveRole(role)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Open account menu"
        >
          <RoleAvatar role={activeRole} />
          <ChevronDown className="size-4" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuGroup>
          {showRoleSwitcher ? (
            <>
              {roles.map((role) => {
                const profile = roleProfiles.find((item) => item.slug === role)
                if (!profile) return null
                const RoleIcon = profile.icon
                return (
                  <DropdownMenuItem key={role} asChild>
                    <Link href="/dashboard" onClick={() => selectRole(role)}>
                      <RoleIcon data-icon="inline-start" />
                      {profile.label}
                      {activeRole === role ? <Check className="ml-auto" aria-hidden="true" /> : null}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              {roles.length < roleProfiles.length ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/onboarding"><Plus data-icon="inline-start" />Add another role</Link>
                  </DropdownMenuItem>
                </>
              ) : null}
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/sign-in"><LogOut data-icon="inline-start" />Log out</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
