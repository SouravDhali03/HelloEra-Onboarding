"use client"

import Image from "next/image"
import { ChevronDown, LifeBuoy, LogOut, ShieldCheck } from "lucide-react"
import { Fragment } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const onboardingSteps = ["Level", "Interests", "Goals", "Format", "Language"]

export function OnboardingShell({
  children,
  progress,
  mainClassName,
}: {
  children: React.ReactNode
  progress?: number
  mainClassName?: string
}) {
  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <header className="h-16 border-b bg-background/90">
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/sign-up" aria-label="Era home">
            <Image src="/logo.png" alt="Era" width={113} height={112} className="size-10 rounded-xl object-cover" priority />
          </a>
          {progress ? (
            <Breadcrumb className="absolute left-1/2 -translate-x-1/2">
              <BreadcrumbList className="flex-nowrap gap-1 text-[10px] sm:gap-2 sm:text-xs">
                {onboardingSteps.map((step, index) => (
                  <Fragment key={step}>
                    <BreadcrumbItem className="gap-1 sm:gap-2">
                      {index + 1 === progress ? <BreadcrumbPage>{step}</BreadcrumbPage> : <span className="text-muted-foreground">{step}</span>}
                    </BreadcrumbItem>
                    {index < onboardingSteps.length - 1 ? <BreadcrumbSeparator /> : null}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Open account menu">
                <Avatar size="sm"><AvatarFallback>S</AvatarFallback></Avatar>
                <span className="sr-only sm:not-sr-only">Account</span>
                <ChevronDown data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <a href="/sign-in"><LogOut data-icon="inline-start" />Log out</a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className={`flex flex-1 items-center justify-center px-4 py-10 ${mainClassName ?? ""}`}>{children}</main>

      <footer className="h-16 border-t bg-background/90">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-between gap-1 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Era. All rights reserved.</p>
          <nav className="flex items-center gap-1" aria-label="Footer navigation">
            <Button asChild variant="ghost" size="sm"><a href="#support"><LifeBuoy data-icon="inline-start" />Need support</a></Button>
            <Button asChild variant="ghost" size="sm"><a href="#privacy"><ShieldCheck data-icon="inline-start" />Privacy policy</a></Button>
          </nav>
        </div>
      </footer>
    </div>
  )
}
