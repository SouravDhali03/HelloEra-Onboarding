"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { JobSeekerMultiSelect, JobSeekerStepLayout, manualSteps } from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
const suggestions = ["Figma", "React", "Project management", "Communication", "Data analysis", "Leadership"]
export default function JobSeekerSkillsStep() { const router = useRouter(); const [selected, setSelected] = useState<string[]>([]); return <JobSeekerStepLayout step={9} steps={manualSteps} description="Tell us about your skills." actions={<><Button asChild variant="outline" size="icon" aria-label="Back"><Link href="/onboarding/job-seeker/step-8"><ArrowLeft /></Link></Button><Button type="submit" form="job-skills" disabled={!selected.length}>Continue</Button></>}><form id="job-skills" onSubmit={(event) => { event.preventDefault(); router.push("/onboarding/job-seeker/step-10") }}><JobSeekerMultiSelect label="Skills" placeholder="Search or add a skill" suggestions={suggestions} selected={selected} onChange={setSelected} /></form></JobSeekerStepLayout> }
