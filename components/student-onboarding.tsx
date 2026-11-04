"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding-shell"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function StudentStepLayout({ step, description, children, actions }: { step: number; description: string; children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <OnboardingShell progress={step}>
      <div className="w-full max-w-[28rem]">
        <div className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">Step {step} of 5</p>
          <h1 className="text-2xl font-medium">{description}</h1>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">{actions}</div>
      </div>
    </OnboardingShell>
  )
}

export function MultiSelectField({ suggestions, placeholder, label, selected, onChange }: { suggestions: string[]; placeholder: string; label: string; selected: string[]; onChange: (values: string[]) => void }) {
  const [query, setQuery] = useState("")
  const [options, setOptions] = useState(suggestions)
  const visibleOptions = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))

  function addCustomValue() {
    const value = query.trim()
    if (!value) return
    const existing = options.find((option) => option.toLowerCase() === value.toLowerCase())
    if (existing) onChange(selected.includes(existing) ? selected : [...selected, existing])
    else { setOptions((current) => [...current, value]); onChange([...selected, value]) }
    setQuery("")
  }

  function selectSearchResult(option: string) {
    if (!selected.includes(option)) onChange([...selected, option])
    setQuery("")
  }

  const searchResults = visibleOptions.filter((option) => !selected.includes(option))
  const showSearchResults = query.trim().length > 0

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={`${label}-search`} className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Input id={`${label}-search`} value={query} placeholder={placeholder} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addCustomValue() } }} aria-expanded={showSearchResults} aria-controls={showSearchResults ? `${label}-search-results` : undefined} />
        {showSearchResults ? (
          <div id={`${label}-search-results`} role="listbox" className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-md">
            {searchResults.length > 0 ? searchResults.map((option) => (
              <button key={option} type="button" role="option" aria-selected="false" className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm hover:bg-muted" onClick={() => selectSearchResult(option)}>
                {option}
              </button>
            )) : <p className="px-3 py-2 text-sm text-muted-foreground">No matching options</p>}
          </div>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground">{selected.length} selected</p>
      <p className="text-xs text-muted-foreground">Suggestions</p>
      <ToggleGroup type="multiple" variant="outline" value={selected} onValueChange={onChange} className="flex flex-wrap gap-2">
        {visibleOptions.map((option) => {
          const isSelected = selected.includes(option)
          const Icon = isSelected ? X : Plus

          return <ToggleGroupItem key={option} value={option} className="h-8 rounded-full px-3 text-xs">
            <span>{option}</span>
            <Icon data-icon="inline-end" aria-hidden="true" />
          </ToggleGroupItem>
        })}
      </ToggleGroup>
    </div>
  )
}
