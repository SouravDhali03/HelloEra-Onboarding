"use client"

import { useState } from "react"
import { Plus, Search, X } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding-shell"
import { SearchSuggestions } from "@/components/search-suggestions"
import { FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function StudentStepLayout({ step, description, children, actions }: { step: number; description: string; children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <OnboardingShell progress={step}>
      <div className="w-full max-w-[28rem]">
        <div className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">Step {step} of 5</p>
          <h1 className="text-lg font-medium">{description}</h1>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">{actions}</div>
      </div>
    </OnboardingShell>
  )
}

export function SuggestionChips({ suggestions, selected, onChange }: { suggestions: string[]; selected: string[]; onChange: (values: string[]) => void }) {
  return (
    <ToggleGroup type="multiple" variant="outline" value={selected} onValueChange={onChange} className="flex flex-wrap gap-2">
      {suggestions.map((option) => {
        const isSelected = selected.includes(option)
        const Icon = isSelected ? X : Plus

        return <ToggleGroupItem key={option} value={option} className="h-8 rounded-full px-3 text-xs">
          <span>{option}</span>
          <Icon data-icon="inline-end" aria-hidden="true" />
        </ToggleGroupItem>
      })}
    </ToggleGroup>
  )
}

export function MultiSelectField({ suggestions, placeholder, label, selected, onChange, showSearch = true }: { suggestions: string[]; placeholder: string; label: string; selected: string[]; onChange: (values: string[]) => void; showSearch?: boolean }) {
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
  const showSearchResults = showSearch && query.trim().length > 0

  return (
    <div className="flex flex-col gap-3">
      <FieldLabel htmlFor={`${label}-search`}>{label}</FieldLabel>
      {showSearch ? <div className="relative">
        <InputGroup><InputGroupAddon align="inline-start"><Search aria-hidden="true" /></InputGroupAddon><InputGroupInput id={`${label}-search`} value={query} placeholder={placeholder} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addCustomValue() } }} aria-expanded={showSearchResults} aria-controls={showSearchResults ? `${label}-search-results` : undefined} /></InputGroup>
        {showSearchResults ? <SearchSuggestions id={`${label}-search-results`} options={searchResults} onSelect={selectSearchResult} /> : null}
      </div> : null}
      <p className="text-xs text-muted-foreground">Suggestions</p>
      <SuggestionChips suggestions={visibleOptions} selected={selected} onChange={onChange} />
    </div>
  )
}
