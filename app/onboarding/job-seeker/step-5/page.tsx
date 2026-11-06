"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { JobSeekerStepLayout, SelectedBadges } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
const options = ["Full time", "Part time", "Internship", "Temporary"]
export default function JobSeekerEmploymentStep() { const router = useRouter(); const [value, setValue] = useState<string[]>([]); return <JobSeekerStepLayout step={5} description="What are your preferred job types?" actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/job-seeker/step-4"><ArrowLeft /></Link></Button><Button type="submit" form="job-employment" disabled={!value.length}>Continue</Button></>}><form id="job-employment" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/job-seeker/step-6") }}><SelectedBadges options={options} value={value} onChange={setValue} /></form></JobSeekerStepLayout> }
