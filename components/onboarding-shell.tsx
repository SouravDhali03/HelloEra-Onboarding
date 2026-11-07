"use client"

import Image from "next/image"
import Link from "next/link"
import { LifeBuoy, ShieldCheck } from "lucide-react"
import { Fragment } from "react"

import { AccountMenu } from "@/components/account-menu"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
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
  progressSteps = onboardingSteps,
  mainClassName,
}: {
  children: React.ReactNode
  progress?: number
  progressSteps?: string[]
  mainClassName?: string
}) {
  return (
    <div
      data-slot="onboarding-shell"
      className="flex min-h-svh flex-col bg-muted/30"
    >
      <header
        data-slot="onboarding-header"
        className="h-16 border-b bg-background/90"
      >
        <div
          data-slot="onboarding-header-content"
          className="relative flex h-full w-full items-center justify-between px-4 py-4 sm:px-6"
        >
          <Link href="/sign-up" aria-label="Era home">
            <Image
              src="/logo.svg"
              alt="Era"
              width={57}
              height={56}
              className="size-10 rounded-xl object-cover"
              priority
            />
          </Link>
          {progress ? (
            <>
              <Breadcrumb className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                <BreadcrumbList className="flex-nowrap gap-1 text-sm font-normal sm:gap-2">
                  {progressSteps.map((step, index) => (
                    <Fragment key={step}>
                      <BreadcrumbItem className="gap-1 sm:gap-2">
                        {index + 1 === progress ? (
                          <BreadcrumbPage className="font-normal">
                            {step}
                          </BreadcrumbPage>
                        ) : (
                          <span
                            className={
                              index + 1 < progress
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            {step}
                          </span>
                        )}
                      </BreadcrumbItem>
                      {index < progressSteps.length - 1 ? (
                        <BreadcrumbSeparator />
                      ) : null}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
              <Breadcrumb className="absolute left-1/2 -translate-x-1/2 lg:hidden">
                <BreadcrumbList className="flex-nowrap gap-1 text-sm font-normal">
                  {progress > 1 ? (
                    <>
                      <BreadcrumbItem>
                        <span className="text-foreground">
                          {progressSteps[0]}
                        </span>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  ) : null}
                  {progress > 2 ? (
                    <>
                      <BreadcrumbItem
                        className={
                          progress === 3
                            ? "sm:hidden"
                            : progress === 4
                              ? "md:hidden"
                              : undefined
                        }
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full"
                              aria-label="Show onboarding steps"
                            >
                              <BreadcrumbEllipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center">
                            <DropdownMenuGroup>
                              {progressSteps.slice(1, -1).map((step) => (
                                <DropdownMenuItem key={step}>
                                  {step}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator
                        className={
                          progress === 3
                            ? "sm:hidden"
                            : progress === 4
                              ? "md:hidden"
                              : undefined
                        }
                      />
                    </>
                  ) : null}
                  {progress > 2
                    ? progressSteps
                        .slice(1, progress - 1)
                        .map((step, index) => {
                          const distanceFromCurrent = progress - (index + 2)
                          const visibility =
                            distanceFromCurrent === 1
                              ? "hidden sm:inline-flex"
                              : distanceFromCurrent === 2
                                ? "hidden md:inline-flex"
                                : "hidden"

                          return (
                            <Fragment key={step}>
                              <BreadcrumbItem className={visibility}>
                                <span className="text-foreground">{step}</span>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator className={visibility} />
                            </Fragment>
                          )
                        })
                    : null}
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-normal">
                      {progressSteps[progress - 1]}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </>
          ) : null}
          <AccountMenu showRoleSwitcher={false} />
        </div>
      </header>

      <main
        data-slot="onboarding-content"
        className={`flex flex-1 items-center justify-center px-4 py-10 ${mainClassName ?? ""}`}
      >
        {children}
      </main>

      <footer
        data-slot="onboarding-footer"
        className="h-16 border-t bg-background/90"
      >
        <div
          data-slot="onboarding-footer-content"
          className="flex h-full w-full flex-col items-center justify-between gap-1 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:px-6"
        >
          <p>© 2026 Era. All rights reserved.</p>
          <nav
            className="flex items-center gap-1"
            aria-label="Footer navigation"
          >
            <Button asChild variant="ghost" size="sm">
              <a href="#support">
                <LifeBuoy data-icon="inline-start" />
                Need support
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="#privacy">
                <ShieldCheck data-icon="inline-start" />
                Privacy policy
              </a>
            </Button>
          </nav>
        </div>
      </footer>
    </div>
  )
}
