"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { JobSeekerStepLayout } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const options = ["Immediately", "Within 15 days", "Within 30 days", "Within 60 days", "Not sure yet"]
export default function JobSeekerAvailabilityStep() { const router = useRouter(); const [value, setValue] = useState(""); return <JobSeekerStepLayout step={4} description="When will you be available to start your next role?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/job-seeker/step-3"><ArrowLeft /></Link></Button><Button type="submit" form="job-availability" disabled={!value}>Continue</Button></>}><form id="job-availability" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/job-seeker/step-5") }}><Field><FieldLabel>Availability</FieldLabel><Select value={value} onValueChange={setValue}><SelectTrigger className="w-full"><span className="flex items-center gap-1.5"><CalendarDays data-icon="inline-start" aria-hidden="true" /><SelectValue placeholder="Select your availability" /></span></SelectTrigger><SelectContent position="popper">{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field></form></JobSeekerStepLayout> }
