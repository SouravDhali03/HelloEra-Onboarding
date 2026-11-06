"use client"

import { useState } from "react"
import { format } from "date-fns"
import { BookOpen, BriefcaseBusiness, Building2, CalendarDays, Certificate, FileText, GraduationCap, Link, Plus, Search, Trash2, UserRoundCheck, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { OnboardingShell } from "@/components/onboarding-shell"
import { SearchSuggestions } from "@/components/search-suggestions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Calendar } from "@/components/ui/calendar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const manualSteps = ["Role", "Workplace", "Location", "Availability", "Employment", "Setup", "Education", "Experience", "Skills", "Certifications"]
export const jobSeekerSteps = manualSteps
const educationDegreeOptions = ["Master's degree", "Bachelor's degree", "Higher school certificate", "Secondary school certificate"]
const graduationStatusOptions = ["Yes", "Currently studying", "No"]

export function JobSeekerStepLayout({ step, description, children, actions, steps = jobSeekerSteps }: { step: number; description: string; children: React.ReactNode; actions: React.ReactNode; steps?: string[] }) {
  return (
    <OnboardingShell progress={step} progressSteps={steps}>
      <div className="w-full max-w-[28rem]">
        <div className="mb-6 text-left">
          <p className="text-sm text-muted-foreground">Step {step} of {steps.length}</p>
          <h1 className="text-lg font-medium">{description}</h1>
        </div>
        <div>{children}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">{actions}</div>
      </div>
    </OnboardingShell>
  )
}

export function JobSeekerMultiSelect({ label, placeholder, suggestions, selected, onChange }: { label: string; placeholder: string; suggestions: string[]; selected: string[]; onChange: (value: string[]) => void }) {
  const [query, setQuery] = useState("")
  const options = [...new Set([...suggestions, ...selected])]
  function add(value: string) { if (!selected.includes(value)) onChange([...selected, value]); setQuery("") }
  return <div className="flex flex-col gap-3">
    <FieldLabel htmlFor={`${label}-search`}>{label}</FieldLabel>
    <div className="relative"><InputGroup><InputGroupAddon align="inline-start"><Search aria-hidden="true" /></InputGroupAddon><InputGroupInput id={`${label}-search`} placeholder={placeholder} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && query.trim()) { event.preventDefault(); add(query.trim()) } }} aria-expanded={Boolean(query.trim())} aria-controls={query.trim() ? `${label}-search-results` : undefined} /></InputGroup><>{query.trim() ? <SearchSuggestions id={`${label}-search-results`} options={options.filter((option) => !selected.includes(option) && option.toLowerCase().includes(query.toLowerCase()))} onSelect={add} /> : null}</></div>
    <p className="text-xs text-muted-foreground">Suggestions</p>
    <ToggleGroup type="multiple" variant="outline" value={selected} onValueChange={onChange} className="flex flex-wrap gap-2">{options.map((option) => { const active = selected.includes(option); const Icon = active ? X : Plus; return <ToggleGroupItem key={option} value={option} className="h-8 rounded-full px-3 text-xs"><span>{option}</span><Icon data-icon="inline-end" aria-hidden="true" /></ToggleGroupItem> })}</ToggleGroup>
  </div>
}

export function JobSeekerSingleSearch({ label, placeholder, suggestions, value, onChange }: { label: string; placeholder: string; suggestions: string[]; value: string; onChange: (value: string) => void }) {
  const [query, setQuery] = useState("")
  const options = [...new Set([value, ...suggestions].filter(Boolean))]
  return <div className="flex flex-col gap-3"><FieldLabel htmlFor={`${label}-search`}>{label}</FieldLabel><div className="relative"><InputGroup><InputGroupAddon align="inline-start"><Search aria-hidden="true" /></InputGroupAddon><InputGroupInput id={`${label}-search`} placeholder={placeholder} value={query || value} onChange={(event) => { setQuery(event.target.value); onChange(event.target.value) }} aria-expanded={Boolean(query.trim())} aria-controls={query.trim() ? `${label}-search-results` : undefined} /></InputGroup>{query.trim() ? <SearchSuggestions id={`${label}-search-results`} options={options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))} onSelect={(option) => { onChange(option); setQuery("") }} /> : null}</div><p className="text-xs text-muted-foreground">Suggestions</p><ToggleGroup type="single" variant="outline" value={value} onValueChange={(next) => next && onChange(next)} className="flex flex-wrap gap-2">{suggestions.map((option) => { const active = value === option; const Icon = active ? X : Plus; return <ToggleGroupItem key={option} value={option} className="h-8 rounded-full px-3 text-xs"><span>{option}</span><Icon data-icon="inline-end" aria-hidden="true" /></ToggleGroupItem> })}</ToggleGroup></div>
}

export function OptionCards({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return <RadioGroup value={value} onValueChange={onChange} className="gap-2">{options.map((option) => <label key={option} htmlFor={option} className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm hover:bg-muted/40"><RadioGroupItem id={option} value={option} /><span>{option}</span></label>)}</RadioGroup>
}

export function TextField({ label, placeholder, name, type = "text", icon: Icon = FileText, required = true, showError = false }: { label: string; placeholder?: string; name: string; type?: string; icon?: LucideIcon; required?: boolean; showError?: boolean }) {
  return <Field><FieldLabel htmlFor={name}>{label}</FieldLabel><InputGroup><InputGroupAddon align="inline-start"><Icon aria-hidden="true" /></InputGroupAddon><InputGroupInput id={name} name={name} type={type} placeholder={placeholder} required={required} /></InputGroup>{showError && required ? <FieldError className="block group-has-[input:valid]:hidden">Please fill out this field.</FieldError> : null}</Field>
}

export function DatePickerField({ label, name, showError = false }: { label: string; name: string; showError?: boolean }) {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const value = date ? format(date, "yyyy-MM-dd") : ""
  return <Field><FieldLabel htmlFor={name}>{label}</FieldLabel><Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button type="button" variant="outline" className="w-full justify-start gap-1.5 border-input bg-input/30 font-normal"><CalendarDays data-icon="inline-start" aria-hidden="true" /><span>{date ? format(date, "dd/MM/yyyy") : "dd / mm / yyyy"}</span></Button></PopoverTrigger><PopoverContent align="start" className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={(selected) => { setDate(selected); setOpen(false) }} /></PopoverContent></Popover><input id={name} name={name} type="hidden" value={value} required />{showError && !date ? <FieldError>Please select a date.</FieldError> : null}</Field>
}

export function RepeatableEducationForm({ showErrors = false }: { showErrors?: boolean }) {
  const [entries, setEntries] = useState([0])
  const [degrees, setDegrees] = useState<Record<number, string>>({})
  const [graduationStatuses, setGraduationStatuses] = useState<Record<number, string>>({})
  return (
    <FieldGroup className="gap-4">
      {entries.map((entry, index) => {
        const degree = degrees[entry] ?? ""
        const graduationStatus = graduationStatuses[entry] ?? ""

        return (
          <div key={entry} className="flex flex-col gap-4 rounded-xl border p-4">
            <TextField name={`institution-${entry}`} label="Institution" placeholder="Institution name" icon={Building2} showError={showErrors} />
            <TextField name={`field-${entry}`} label="Field of study" placeholder="Computer science" icon={BookOpen} showError={showErrors} />
            <Field>
              <FieldLabel htmlFor={`degree-${entry}`}>Degree</FieldLabel>
              <Select value={degree} onValueChange={(value) => setDegrees((current) => ({ ...current, [entry]: value }))} required>
                <SelectTrigger id={`degree-${entry}`} className="w-full">
                  <span className="flex items-center gap-1.5"><Certificate aria-hidden="true" /><SelectValue placeholder="Select degree" /></span>
                </SelectTrigger>
                <SelectContent position="popper">{educationDegreeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
              </Select>
              {showErrors ? <FieldError className={degree ? "hidden" : "block"}>Please select a degree.</FieldError> : null}
            </Field>
            <Field>
              <FieldLabel htmlFor={`graduated-${entry}`}>Graduated</FieldLabel>
              <Select value={graduationStatus} onValueChange={(value) => setGraduationStatuses((current) => ({ ...current, [entry]: value }))} required>
                <SelectTrigger id={`graduated-${entry}`} className="w-full">
                  <span className="flex items-center gap-1.5"><GraduationCap aria-hidden="true" /><SelectValue placeholder="Select graduation status" /></span>
                </SelectTrigger>
                <SelectContent position="popper">{graduationStatusOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
              </Select>
              {showErrors ? <FieldError className={graduationStatus ? "hidden" : "block"}>Please select a graduation status.</FieldError> : null}
            </Field>
            {index > 0 ? <Button type="button" variant="link" className="self-start text-destructive hover:text-destructive" onClick={() => { setEntries((current) => current.filter((item) => item !== entry)); setDegrees((current) => { const next = { ...current }; delete next[entry]; return next }); setGraduationStatuses((current) => { const next = { ...current }; delete next[entry]; return next }) }}><Trash2 data-icon="inline-start" />Remove education</Button> : null}
          </div>
        )
      })}
      <Button type="button" variant="outline" onClick={() => setEntries((current) => [...current, Math.max(...current) + 1])}><Plus data-icon="inline-start" />Add another degree</Button>
    </FieldGroup>
  )
}

export function RepeatableExperienceForm({ showErrors = false }: { showErrors?: boolean }) {
  const [entries, setEntries] = useState([0])
  const [statuses, setStatuses] = useState<Record<number, string>>({})
  return (
    <FieldGroup className="gap-4">
      {entries.map((entry, index) => (
        <div key={entry} className="flex flex-col gap-4 rounded-xl border p-4">
          <TextField name={`employer-${entry}`} label="Employer" placeholder="Company name" icon={Building2} showError={showErrors} />
          <TextField name={`role-${entry}`} label="Role" placeholder="Product designer" icon={BriefcaseBusiness} showError={showErrors} />
          <Field>
            <FieldLabel>Employment status</FieldLabel>
            <Select value={statuses[entry] ?? ""} onValueChange={(value) => setStatuses((current) => ({ ...current, [entry]: value }))} required>
              <SelectTrigger className="w-full">
                <span className="flex items-center gap-1.5"><UserRoundCheck aria-hidden="true" /><SelectValue placeholder="Select status" /></span>
              </SelectTrigger>
              <SelectContent position="popper"><SelectItem value="current">Currently employed</SelectItem><SelectItem value="previous">Previous employment</SelectItem></SelectContent>
            </Select>
            {showErrors && !statuses[entry] ? <FieldError>Please select an employment status.</FieldError> : null}
          </Field>
          {statuses[entry] === "previous" ? <><DatePickerField name={`from-${entry}`} label="From" showError={showErrors} /><DatePickerField name={`to-${entry}`} label="To" showError={showErrors} /></> : null}
          <Field>
            <FieldLabel htmlFor={`description-${entry}`}>Job description</FieldLabel>
            <Textarea id={`description-${entry}`} name={`description-${entry}`} placeholder="Describe your responsibilities" />
          </Field>
          {index > 0 ? <Button type="button" variant="link" className="self-start text-destructive hover:text-destructive" onClick={() => setEntries((current) => current.filter((item) => item !== entry))}><Trash2 data-icon="inline-start" />Remove</Button> : null}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => setEntries((current) => [...current, Math.max(...current) + 1])}><Plus data-icon="inline-start" />Add more experience</Button>
    </FieldGroup>
  )
}

export function RepeatableCertificationForm({ showErrors = false }: { showErrors?: boolean }) {
  const [entries, setEntries] = useState([0])
  return <FieldGroup className="gap-4">{entries.map((entry, index) => <div key={entry} className="flex flex-col gap-4 rounded-xl border p-4"><TextField name={`certificate-${entry}`} label="Certificate name" placeholder="Certificate name" icon={Certificate} showError={showErrors} /><TextField name={`issuer-${entry}`} label="Issuing organization" placeholder="Organization" icon={Building2} showError={showErrors} /><DatePickerField name={`issue-date-${entry}`} label="Issue date" showError={showErrors} /><TextField name={`certificate-link-${entry}`} label="Link" type="url" placeholder="https://" icon={Link} required={false} showError={showErrors} />{index > 0 ? <Button type="button" variant="link" className="self-start text-destructive hover:text-destructive" onClick={() => setEntries((current) => current.filter((item) => item !== entry))}><Trash2 data-icon="inline-start" />Remove</Button> : null}</div>)}<Button type="button" variant="outline" onClick={() => setEntries((current) => [...current, Math.max(...current) + 1])}><Plus data-icon="inline-start" />Add more certificate</Button></FieldGroup>
}

export function SelectedBadges({ options, value, onChange }: { options: string[]; value: string[]; onChange: (value: string[]) => void }) {
  return <ToggleGroup type="multiple" variant="outline" value={value} onValueChange={onChange} className="flex flex-wrap gap-2">{options.map((option) => { const active = value.includes(option); const Icon = active ? X : Plus; return <ToggleGroupItem key={option} value={option} className="h-8 rounded-full px-3 text-xs"><span>{option}</span><Icon data-icon="inline-end" aria-hidden="true" /></ToggleGroupItem> })}</ToggleGroup>
}

export function UploadedFileSummary({ fileName }: { fileName: string }) { return <Badge variant="outline">{fileName}</Badge> }
