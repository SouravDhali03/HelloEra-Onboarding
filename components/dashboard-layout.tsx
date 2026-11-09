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
  FileText,
  Images,
  ListChecks,
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
  type LucideIcon,
} from "lucide-react"

import { AccountMenu } from "@/components/account-menu"
import { DashboardHeaderPopover } from "@/components/dashboard-header-actions"
import { DashboardMobileNavigation } from "@/components/dashboard-mobile-navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
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

export type DashboardRole = keyof typeof roleMenus
export type DashboardNavigationKey =
  "newsfeed" | "marketplace" | "resources" | "saved" | "none"

const generalNavigationItems: Array<{
  key: DashboardNavigationKey
  label: string
  icon: LucideIcon
  href: string
}> = [
  { key: "newsfeed", label: "Newsfeed", icon: Newspaper, href: "/dashboard" },
  {
    key: "marketplace",
    label: "Marketplace",
    icon: ShoppingBag,
    href: "/coming-soon/marketplace",
  },
  { key: "resources", label: "Resources", icon: BookOpen, href: "/resources" },
  { key: "saved", label: "Saved", icon: Bookmark, href: "/coming-soon/saved" },
]

export function AppLayout({
  children,
  role = "student",
  activeNav = "newsfeed",
  activeModule,
}: {
  children: React.ReactNode
  role?: DashboardRole
  activeNav?: DashboardNavigationKey
  activeModule?: string
}) {
  const roleMenu = roleMenus[role]

  return (
    <div
      data-slot="dashboard-shell"
      className="flex min-h-svh flex-col overflow-x-clip bg-muted/20"
    >
      <DashboardHeader role={role} />
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
            <DashboardSidebar
              roleMenu={roleMenu}
              activeNav={activeNav}
              activeModule={activeModule}
            />
            <SidebarInset
              data-layout-slot="dashboard-content"
              className="min-w-0 pb-20 md:pb-0"
            >
              {children}
            </SidebarInset>
          </div>
          <DashboardMobileNavigation activeKey={activeNav} />
        </SidebarProvider>
      </section>
    </div>
  )
}

// Kept as a compatibility alias for existing dashboard consumers.
export const DashboardLayout = AppLayout

function DashboardHeader({ role }: { role: DashboardRole }) {
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
            href: "/coming-soon/marketplace",
          }}
        />
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
        <AccountMenu align="end" activeRole={role} roles={[role]} />
      </div>
    </header>
  )
}

function DashboardSidebar({
  roleMenu,
  activeNav,
  activeModule,
}: {
  roleMenu: (typeof roleMenus)[DashboardRole]
  activeNav: DashboardNavigationKey
  activeModule?: string
}) {
  return (
    <Sidebar
      data-layout-slot="dashboard-sidebar"
      mobileSide="right"
      collapsible="offcanvas"
      className="top-16 h-[calc(100svh-4rem)] overflow-hidden !border-r-0 bg-transparent md:group-data-[state=expanded]:data-[side=left]:left-[var(--dashboard-gutter)]"
    >
      <SidebarContent>
        <SidebarGroup className="max-md:hidden">
          <SidebarGroupLabel className="text-[11px] tracking-wide uppercase">
            General
          </SidebarGroupLabel>
          <SidebarMenu>
            {generalNavigationItems.map(({ key, label, icon: Icon, href }) => (
              <SidebarMenuItem key={key}>
                <SidebarMenuButton asChild isActive={activeNav === key}>
                  <Link href={href}>
                    <Icon data-icon="inline-start" />
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="max-md:hidden" />
        {roleMenu.items.length ? (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] tracking-wide uppercase">
              {roleMenu.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {roleMenu.items.map(([label, Icon]) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeModule === toModuleSlug(label)}
                  >
                    <Link href={`/coming-soon/${toModuleSlug(label)}`}>
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
            <SidebarMenuButton asChild isActive={activeModule === "settings"}>
              <Link href="/coming-soon/settings">
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

function toModuleSlug(label: string) {
  return label
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
