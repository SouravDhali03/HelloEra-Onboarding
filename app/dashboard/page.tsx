import Image from "next/image"
import Link from "next/link"
import {
  BadgeCheck,
  Bookmark,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Bell,
  FileText,
  Images,
  ListChecks,
  MessageCircle,
  Newspaper,
  Search,
  Settings,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
  Video,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"

import { AccountMenu } from "@/components/account-menu"
import { DashboardHeaderPopover } from "@/components/dashboard-header-actions"
import { NewsfeedPage } from "@/features/newsfeed/components/newsfeed-page"
import type { UserRole } from "@/features/newsfeed/types"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const roleMenus = {
  student: {
    label: "Student",
    items: [
      ["My Learning", BookOpen],
      ["Find Tutors", Search],
      ["Study Groups", Users],
      ["Preferences", SlidersHorizontal],
    ],
  },
  "job-seeker": {
    label: "Career / Job Seeker",
    items: [
      ["Find Jobs", Search],
      ["Job Tracker", ListChecks],
      ["Applications", FileText],
      ["Career Profile", UserRound],
      ["Interviews", Video],
    ],
  },
  freelancer: {
    label: "Freelancer",
    items: [
      ["My Services", ShoppingBag],
      ["Projects & Orders", BriefcaseBusiness],
      ["Opportunities", Sparkles],
      ["Portfolio", Images],
      ["Performance", TrendingUp],
    ],
  },
  tutor: {
    label: "Tutor",
    items: [
      ["My Students", Users],
      ["Classes & Bookings", CalendarCheck],
      ["Schedule & Availability", CalendarDays],
      ["Teaching Profile", UserRound],
      ["Qualification", BadgeCheck],
      ["Performance", ChartNoAxesColumnIncreasing],
    ],
  },
  seller: {
    label: "Seller",
    items: [],
  },
} as const

const generalNavigationItems: Array<{
  label: string
  icon: LucideIcon
  href: string
}> = [
  { label: "Newsfeed", icon: Newspaper, href: "/dashboard" },
  { label: "Marketplace", icon: ShoppingBag, href: "/dashboard#marketplace" },
  { label: "Resources", icon: BookOpen, href: "/dashboard#resources" },
  { label: "Saved", icon: Bookmark, href: "/dashboard#saved" },
]

function toNewsfeedRole(role: keyof typeof roleMenus): UserRole {
  return role === "job-seeker" ? "job_seeker" : role
}

export default async function DashboardPage() {
  const role = "student"
  const roles = [role]
  const roleMenu =
    roleMenus[role as keyof typeof roleMenus] ?? roleMenus.student

  return (
    <DashboardShell>
      <DashboardHeader role={role} roles={roles} />
      <DashboardBody roleMenu={roleMenu} role={role} />
    </DashboardShell>
  )
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-slot="dashboard-shell"
      className="flex min-h-svh flex-col overflow-x-clip bg-muted/20"
    >
      {children}
    </div>
  )
}

function DashboardHeader({
  role,
  roles,
}: {
  role: keyof typeof roleMenus
  roles: string[]
}) {
  return (
    <header
      data-slot="dashboard-header"
      className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-6"
    >
      <Link href="/dashboard" aria-label="Era dashboard">
        <Image
          src={
            process.env.NODE_ENV === "production"
              ? "/HelloEra-Onboarding/logo.svg"
              : "/logo.svg"
          }
          alt="Era"
          width={57}
          height={56}
          className="size-10 rounded-xl object-cover"
          priority
        />
      </Link>
      <div className="ml-auto flex items-center gap-1">
        <DashboardHeaderPopover
          icon="cart"
          label="Open cart"
          title="Cart"
          emptyTitle="Your cart is empty"
          description="Items you add from the marketplace will appear here."
          action={{
            label: "Browse marketplace",
            href: "/dashboard#marketplace",
          }}
        />
        <Button variant="ghost" size="icon-lg" aria-label="Search">
          <Search data-icon="inline-start" />
        </Button>
        <DashboardHeaderPopover
          icon="messages"
          label="Open messages"
          title="Messages"
          emptyTitle="No messages yet"
          description="New conversations will appear here."
        />
        <DashboardHeaderPopover
          icon="notifications"
          label="Open notifications"
          title="Notifications"
          emptyTitle="You’re all caught up"
          description="New activity will appear here."
        />
        <AccountMenu align="end" activeRole={role} roles={roles} />
      </div>
    </header>
  )
}

function DashboardBody({
  roleMenu,
  role,
}: {
  roleMenu: (typeof roleMenus)[keyof typeof roleMenus]
  role: keyof typeof roleMenus
}) {
  return (
    <section
      data-slot="dashboard-body"
      style={
        {
          "--dashboard-gutter": "max(0px, calc((100vw - 96rem) / 2))",
        } as React.CSSProperties
      }
      className="mx-auto flex min-h-0 w-full max-w-screen-2xl flex-1"
      aria-label="Dashboard workspace"
    >
      <SidebarProvider className="min-h-0 flex-1 flex-col [--sidebar:transparent]">
        <div
          data-layout-slot="dashboard-body-layout"
          className="flex min-h-0 flex-1"
        >
          <DashboardSidebar roleMenu={roleMenu} />
          <SidebarInset
            data-layout-slot="dashboard-content"
            className="min-w-0 pb-20 md:pb-0"
          >
            <NewsfeedPage activeRole={toNewsfeedRole(role)} />
          </SidebarInset>
        </div>
        <MobileNavigation />
      </SidebarProvider>
    </section>
  )
}

function DashboardSidebar({
  roleMenu,
}: {
  roleMenu: (typeof roleMenus)[keyof typeof roleMenus]
}) {
  return (
    <Sidebar
      data-layout-slot="dashboard-sidebar"
      mobileSide="right"
      collapsible="offcanvas"
      className="top-16 h-[calc(100svh-4rem)] overflow-hidden !border-r-0 bg-transparent md:group-data-[state=expanded]:data-[side=left]:left-[var(--dashboard-gutter)]"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] tracking-wide uppercase">
            General
          </SidebarGroupLabel>
          <SidebarMenu>
            {generalNavigationItems.map(
              ({ label, icon: Icon, href }, index) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild isActive={index === 0}>
                    <Link href={href}>
                      <Icon data-icon="inline-start" />
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        {roleMenu.items.length ? (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] tracking-wide uppercase">
              {roleMenu.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {roleMenu.items.map(([label, Icon]) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/dashboard#${encodeURIComponent(label.toLowerCase())}`}
                    >
                      <Icon data-icon="inline-start" />
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard#settings">
                <Settings data-icon="inline-start" />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function MobileNavigation() {
  return (
    <nav
      data-slot="mobile-navigation"
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-background/95 p-2.5 backdrop-blur md:hidden"
    >
      <Button variant="ghost" size="icon-sm" className="mx-auto" asChild>
        <Link href="/dashboard" aria-label="Newsfeed">
          <Newspaper data-icon="inline-start" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon-sm" className="mx-auto" asChild>
        <Link href="/dashboard#marketplace" aria-label="Marketplace">
          <ShoppingBag data-icon="inline-start" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon-sm" className="mx-auto" asChild>
        <Link href="/dashboard#resources" aria-label="Resources">
          <BookOpen data-icon="inline-start" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon-sm" className="mx-auto" asChild>
        <Link href="/dashboard#saved" aria-label="Saved">
          <Bookmark data-icon="inline-start" />
        </Link>
      </Button>
      <div className="flex items-center justify-center">
        <SidebarTrigger className="size-8" aria-label="Open more navigation" />
      </div>
    </nav>
  )
}
