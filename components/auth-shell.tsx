import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Languages, LifeBuoy, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div data-slot="auth-shell" className="flex min-h-svh flex-col bg-muted/30">
      <header
        data-slot="auth-header"
        className="h-16 border-b bg-background/90"
      >
        <div
          data-slot="auth-header-content"
          className="flex h-full w-full items-center justify-between px-4 py-4 sm:px-6"
        >
          <Link href="/sign-up" aria-label="Era home">
            <Image
              src={
                process.env.NODE_ENV === "production"
                  ? "/HelloEra-Onboarding/logo.svg"
                  : "/logo.svg"
              }
              alt="Era"
              width={113}
              height={112}
              className="size-10 rounded-xl object-cover"
              priority
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Languages data-icon="inline-start" />
                English
                <ChevronDown data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>বাংলা</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main
        data-slot="auth-content"
        className="flex flex-1 items-center justify-center px-4 py-10"
      >
        {children}
      </main>

      <footer
        data-slot="auth-footer"
        className="h-16 border-t bg-background/90"
      >
        <div
          data-slot="auth-footer-content"
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
