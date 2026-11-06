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
} from "lucide-react"

import { AccountMenu } from "@/components/account-menu"
import { NewsfeedPage } from "@/features/newsfeed/components/newsfeed-page"
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

export default async function DashboardPage() {
  const role = "student"
  const roles = [role]
  const roleMenu = roleMenus[role as keyof typeof roleMenus] ?? roleMenus.student

  return (
    <div className="flex min-h-svh flex-col overflow-x-clip bg-muted/20">
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b bg-background px-4 sm:px-6">
        <Link href="/dashboard" aria-label="Era dashboard">
          <Image src={process.env.GITHUB_ACTIONS ? "/HelloEra-Onboarding/logo.png" : "/logo.png"} alt="Era" width={113} height={112} className="size-8 rounded-lg object-cover" priority />
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Open cart"><ShoppingCart data-icon="inline-start" /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Search"><Search data-icon="inline-start" /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Open messages"><MessageCircle data-icon="inline-start" /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Open notifications"><Bell data-icon="inline-start" /></Button>
          <AccountMenu align="end" activeRole={role} roles={roles} />
        </div>
      </header>
      <SidebarProvider className="min-h-0 flex-1 [--sidebar:transparent]">
        <Sidebar collapsible="none" className="sticky top-14 h-[calc(100svh-3.5rem)] self-start overflow-hidden bg-transparent">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[11px] uppercase tracking-wide">General</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="/dashboard"><Newspaper data-icon="inline-start" />Newsfeed</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard#marketplace"><ShoppingBag data-icon="inline-start" />Marketplace</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard#resources"><BookOpen data-icon="inline-start" />Resources</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard#saved"><Bookmark data-icon="inline-start" />Saved</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            {roleMenu.items.length ? (
              <SidebarGroup>
                <SidebarGroupLabel className="text-[11px] uppercase tracking-wide">{roleMenu.label}</SidebarGroupLabel>
                <SidebarMenu>
                  {roleMenu.items.map(([label, Icon]) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton asChild>
                        <Link href={`/dashboard#${encodeURIComponent(label.toLowerCase())}`}><Icon data-icon="inline-start" />{label}</Link>
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
                  <Link href="/dashboard#settings"><Settings data-icon="inline-start" />Settings</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-w-0">
          <NewsfeedPage activeRole={role} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
