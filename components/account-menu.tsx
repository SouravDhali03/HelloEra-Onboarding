"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  GraduationCap,
  Laptop,
  LogOut,
  Plus,
  Presentation,
  Store,
} from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { getStoredUserName } from "@/lib/user-profile"
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
  { slug: "tutor", label: "Tutor", icon: Presentation },
  { slug: "seller", label: "Seller", icon: Store },
] as const

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length > 1)
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
  return words[0]?.slice(0, 2).toUpperCase() || "S"
}

export function RoleAvatar({
  role = "student",
  name,
  size = "default",
  className,
  showBadge = true,
}: {
  role?: string
  name?: string
  size?: "default" | "sm" | "lg"
  className?: string
  showBadge?: boolean
}) {
  const profile =
    roleProfiles.find((item) => item.slug === role) ?? roleProfiles[0]
  const RoleIcon = profile.icon

  return (
    <Avatar size={size} className={className}>
      <AvatarFallback>{name ? initials(name) : "S"}</AvatarFallback>
      {showBadge ? (
        <AvatarBadge>
          <RoleIcon aria-hidden="true" />
        </AvatarBadge>
      ) : null}
    </Avatar>
  )
}

function readCookie(name: string) {
  if (typeof document === "undefined") return ""
  const value =
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? ""
  return decodeURIComponent(value)
}

function readRoleList() {
  return readCookie("era-roles")
    .split(",")
    .filter((role) => roleProfiles.some((profile) => profile.slug === role))
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
  const [roles, setRoles] = useState(
    initialRoles?.length ? initialRoles : ["student"]
  )
  const [userName, setUserName] = useState("Sourav Dhali")

  useEffect(() => {
    const storedRoles = readRoleList()
    const storedActiveRole = readCookie("era-role")
    const storedUserName = getStoredUserName()
    const nextRoles = Array.from(
      new Set([...storedRoles, storedActiveRole])
    ).filter((role) => roleProfiles.some((profile) => profile.slug === role))
    // The cookie is the source of truth for the client-only account menu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (nextRoles.length) setRoles(nextRoles)
    if (storedActiveRole) setActiveRole(storedActiveRole)
    if (storedUserName) setUserName(storedUserName)
  }, [])

  function selectRole(role: string) {
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `era-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}`
    setActiveRole(role)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Open account menu"
        >
          <RoleAvatar name={userName} role={activeRole} className="size-10" />
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
                      {activeRole === role ? (
                        <Check className="ml-auto" aria-hidden="true" />
                      ) : null}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              {roles.length < roleProfiles.length ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/onboarding">
                      <Plus data-icon="inline-start" />
                      Add another role
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : null}
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/sign-in">
              <LogOut data-icon="inline-start" />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
