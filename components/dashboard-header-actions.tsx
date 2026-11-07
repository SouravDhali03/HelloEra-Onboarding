"use client"

import { Bell, MessageCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const headerIcons = {
  cart: ShoppingCart,
  messages: MessageCircle,
  notifications: Bell,
} as const

type DashboardHeaderPopoverProps = {
  icon: keyof typeof headerIcons
  label: string
  title: string
  emptyTitle: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function DashboardHeaderPopover({
  icon,
  label,
  title,
  emptyTitle,
  description,
  action,
}: DashboardHeaderPopoverProps) {
  const Icon = headerIcons[icon]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-lg" aria-label={label}>
          <Icon data-icon="inline-start" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 gap-0 overflow-hidden p-0 sm:w-96"
      >
        <PopoverHeader className="border-b px-4 py-3">
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription className="sr-only">
            {description}
          </PopoverDescription>
        </PopoverHeader>
        <Empty className="min-h-40 rounded-none border-0 p-6">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          {action ? (
            <EmptyContent>
              <Button asChild size="sm">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            </EmptyContent>
          ) : null}
        </Empty>
      </PopoverContent>
    </Popover>
  )
}
