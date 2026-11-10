"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  mockResourceProgressStore,
  type ResourceProgressStore,
} from "../data/resource-progress-store"
import type { ResourceProgress, ResourceSection } from "../types"

type ResourceProgressContextValue = {
  progress: ResourceProgress
  updateProgress: (update: Partial<ResourceProgress>) => void
}

const ResourceProgressContext = createContext<
  ResourceProgressContextValue | undefined
>(undefined)

export function ResourceProgressProvider({
  initialProgress,
  sections,
  store = mockResourceProgressStore,
  children,
}: {
  initialProgress: ResourceProgress
  sections: ResourceSection[]
  store?: ResourceProgressStore
  children: React.ReactNode
}) {
  const getProgressSnapshot = useCallback(
    () => store.get(initialProgress.resourceId) ?? initialProgress,
    [initialProgress, store]
  )
  const progress = useSyncExternalStore(
    store.subscribe,
    getProgressSnapshot,
    getProgressSnapshot
  )

  const updateProgress = useCallback(
    (update: Partial<ResourceProgress>) => {
      const current = getProgressSnapshot()
      const next = { ...current, ...update }
      const completedSectionIds = next.completedSectionIds.filter((id) =>
        sections.some((section) => section.id === id)
      )
      const completedSectionsChanged =
        completedSectionIds.length !== current.completedSectionIds.length ||
        completedSectionIds.some(
          (id) => !current.completedSectionIds.includes(id)
        )
      const currentSectionChanged =
        update.currentSectionId !== undefined &&
        update.currentSectionId !== current.currentSectionId
      const percent = Math.min(
        100,
        Math.round((completedSectionIds.length / sections.length) * 100)
      )
      const completed = completedSectionIds.length === sections.length

      if (
        !completedSectionsChanged &&
        !currentSectionChanged &&
        current.percent === percent
      )
        return

      const updatedProgress: ResourceProgress = {
        ...next,
        completedSectionIds,
        percent,
        state: completed ? "completed" : "in_progress",
        startedAt: next.startedAt ?? new Date().toISOString(),
        completedAt: completed
          ? (next.completedAt ?? new Date().toISOString())
          : undefined,
        lastOpenedAt: new Date().toISOString(),
      }

      store.update(updatedProgress)
    },
    [getProgressSnapshot, sections, store]
  )

  const value = useMemo<ResourceProgressContextValue>(
    () => ({ progress, updateProgress }),
    [progress, updateProgress]
  )

  return (
    <ResourceProgressContext.Provider value={value}>
      {children}
    </ResourceProgressContext.Provider>
  )
}

function useResourceProgress() {
  const context = useContext(ResourceProgressContext)
  if (!context) {
    throw new Error(
      "Resource reader components must be rendered inside ResourceProgressProvider"
    )
  }

  return context
}

export function ResourceReader({ sections }: { sections: ResourceSection[] }) {
  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <div
        id="resource-reader"
        className="flex scroll-mt-24 flex-col gap-5 text-base leading-7"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            className="flex scroll-mt-24 flex-col gap-2"
          >
            <h2
              id={section.id}
              className="font-heading text-xl font-semibold tracking-tight"
            >
              {section.title}
            </h2>
            {section.blocks.map((block) => (
              <p key={block.id}>{block.text}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

export function ResourceTableOfContents({
  sections,
}: {
  sections: ResourceSection[]
}) {
  const { progress, updateProgress } = useResourceProgress()

  useEffect(() => {
    const updateCompletedSections = () => {
      const visibleSections = sections.filter((section) => {
        const element = document.getElementById(section.id)
        if (!element) return false

        return (
          element.getBoundingClientRect().bottom <= window.innerHeight * 0.72
        )
      })
      const reader = document.getElementById("resource-reader")
      const isArticleComplete =
        reader !== null &&
        reader.getBoundingClientRect().bottom <= window.innerHeight + 8
      const completedSectionIds = isArticleComplete
        ? sections.map((section) => section.id)
        : Array.from(
            new Set([
              ...progress.completedSectionIds,
              ...visibleSections.map((section) => section.id),
            ])
          )
      const expectedPercent = Math.min(
        100,
        Math.round((completedSectionIds.length / sections.length) * 100)
      )
      const currentSection = sections
        .filter((section) => {
          const element = document.getElementById(section.id)
          if (!element) return false

          const rect = element.getBoundingClientRect()
          return rect.top <= window.innerHeight * 0.4 && rect.bottom > 0
        })
        .at(-1)

      if (
        completedSectionIds.length !== progress.completedSectionIds.length ||
        completedSectionIds.some(
          (id) => !progress.completedSectionIds.includes(id)
        ) ||
        progress.percent !== expectedPercent
      ) {
        updateProgress({
          completedSectionIds,
          currentSectionId: currentSection?.id ?? null,
        })
      } else if (
        currentSection &&
        currentSection.id !== progress.currentSectionId
      ) {
        updateProgress({ currentSectionId: currentSection.id })
      }
    }

    updateCompletedSections()
    window.addEventListener("scroll", updateCompletedSections, {
      passive: true,
    })
    window.addEventListener("resize", updateCompletedSections)

    return () => {
      window.removeEventListener("scroll", updateCompletedSections)
      window.removeEventListener("resize", updateCompletedSections)
    }
  }, [
    progress.completedSectionIds,
    progress.currentSectionId,
    progress.percent,
    sections,
    updateProgress,
  ])

  return (
    <aside className="self-start lg:sticky lg:top-20">
      <Card size="sm">
        <CardHeader>
          <CardTitle>On this page</CardTitle>
        </CardHeader>
        <CardContent>
          <nav aria-label="Table of contents">
            <ol className="flex flex-col gap-1 text-sm">
              {sections.map((section, index) => {
                const isCompleted = progress.completedSectionIds.includes(
                  section.id
                )
                const isCurrent = progress.currentSectionId === section.id

                return (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      aria-current={isCurrent ? "location" : undefined}
                      className={cn(
                        "flex gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        isCurrent && "font-medium text-foreground",
                        isCompleted && "text-primary"
                      )}
                    >
                      <span className="flex w-5 shrink-0 items-center justify-center text-xs text-muted-foreground/70 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                      {isCompleted ? (
                        <span className="sr-only">Completed</span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </nav>
        </CardContent>
      </Card>
    </aside>
  )
}
