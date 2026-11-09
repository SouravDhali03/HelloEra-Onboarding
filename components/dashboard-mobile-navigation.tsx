"use client"

import { useEffect, useState } from "react"
import { Bookmark, BookOpen, Newspaper, ShoppingBag } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

type NavigationKey = "newsfeed" | "marketplace" | "resources" | "saved" | "none"

const navigationItems = [
  { key: "newsfeed", label: "Newsfeed", icon: Newspaper, href: "/dashboard" },
  {
    key: "marketplace",
    label: "Marketplace",
    icon: ShoppingBag,
    href: "/marketplace",
  },
  {
    key: "resources",
    label: "Resources",
    icon: BookOpen,
    href: "/resources",
  },
  { key: "saved", label: "Saved", icon: Bookmark, href: "/saved" },
] as const

function getActiveKey(): NavigationKey {
  const hash = window.location.hash.slice(1)
  const key = hash ? decodeURIComponent(hash) : "newsfeed"
  return ["newsfeed", "marketplace", "resources", "saved"].includes(key)
    ? (key as NavigationKey)
    : "newsfeed"
}

export function DashboardMobileNavigation({
  activeKey: routeActiveKey = "newsfeed",
}: {
  activeKey?: NavigationKey
}) {
  const [hashActiveKey, setHashActiveKey] = useState<NavigationKey>("newsfeed")

  useEffect(() => {
    if (routeActiveKey !== "newsfeed") {
      return
    }

    const updateActiveItem = () => setHashActiveKey(getActiveKey())

    updateActiveItem()
    window.addEventListener("hashchange", updateActiveItem)
    return () => window.removeEventListener("hashchange", updateActiveItem)
  }, [routeActiveKey])

  const activeKey =
    routeActiveKey === "newsfeed" ? hashActiveKey : routeActiveKey

  return (
    <nav
      data-slot="mobile-navigation"
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-background/95 p-2.5 backdrop-blur md:hidden"
    >
      {navigationItems.map(({ key, label, icon: Icon, href }) => {
        const isActive = activeKey === key

        return (
          <Button
            key={key}
            variant="ghost"
            size="icon-sm"
            className="mx-auto data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
            data-active={isActive}
            asChild
          >
            <Link
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setHashActiveKey(key)}
            >
              <Icon data-icon="inline-start" />
            </Link>
          </Button>
        )
      })}
      <div className="flex items-center justify-center">
        <SidebarTrigger className="size-8" aria-label="Open more navigation" />
      </div>
    </nav>
  )
}
