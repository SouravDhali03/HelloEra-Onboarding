"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowLeft, FileText, Upload, X } from "lucide-react"
import {
  JobSeekerStepLayout,
  manualSteps,
} from "@/components/job-seeker-onboarding"
import { Button } from "@/components/ui/button"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
export default function JobSeekerUploadCvPage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ name: string; size: string } | null>(null)
  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  function handleFileChange(selectedFile: File | undefined) {
    setFile(
      selectedFile
        ? { name: selectedFile.name, size: formatFileSize(selectedFile.size) }
        : null
    )
  }
  function removeFile() {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ""
  }
  return (
    <JobSeekerStepLayout
      step={6}
      steps={manualSteps}
      description="Upload your CV to prefill your profile."
      actions={
        <>
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/onboarding/job-seeker/step-6">
              <ArrowLeft />
            </Link>
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/step-7")}
            disabled={!file}
          >
            Continue
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {file ? (
          <Attachment
            state="done"
            className="w-full animate-in duration-200 fade-in-0 slide-in-from-bottom-1 motion-reduce:animate-none"
          >
            <AttachmentMedia variant="icon">
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.size}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                type="button"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={removeFile}
                aria-label="Remove CV"
              >
                <X aria-hidden="true" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="h-auto w-full animate-in flex-col gap-3 rounded-xl border-dashed p-8 text-center duration-200 fade-in-0 slide-in-from-bottom-1 motion-reduce:animate-none"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="text-muted-foreground" />
            <span className="text-sm font-medium">Upload CV</span>
            <span className="text-xs text-muted-foreground">
              PDF or DOCX, up to 10 MB
            </span>
          </Button>
        )}
        <input
          ref={inputRef}
          id="cv-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(event) => handleFileChange(event.target.files?.[0])}
        />
        <p className="text-xs text-muted-foreground">
          Your CV details will be used to prefill your profile.
        </p>
      </div>
    </JobSeekerStepLayout>
  )
}
