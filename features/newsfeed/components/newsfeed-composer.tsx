"use client"

/* Native media is intentional for previews and local blob URLs. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Image as ImageIcon, Link2, Paperclip, X } from "lucide-react"
import { toast } from "sonner"

import { RoleAvatar } from "@/components/account-menu"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import type { LinkPreview, MediaItem, Post, UserRole } from "../types"

const MAX_FILES = 8
const MAX_FILE_SIZE = 25 * 1024 * 1024
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
]

function roleLabel(role: string) {
  return (
    (
      {
        student: "Student",
        job_seeker: "Career / Job Seeker",
        "job-seeker": "Career / Job Seeker",
        freelancer: "Freelancer",
        tutor: "Tutor",
        seller: "Seller",
        employer: "Employer",
      } as Record<string, string>
    )[role] ?? role
  )
}

function detectUrl(value: string) {
  return value.match(/https?:\/\/[^\s]+/i)?.[0] ?? ""
}

function getPreview(url: string): LinkPreview | undefined {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    if (parsed.hostname === "example.com") {
      return {
        url,
        domain: parsed.hostname,
        siteName: "Era resource",
        title: "A useful resource from the Era community",
        description:
          "Preview metadata is simulated for this frontend demonstration.",
        status: "ready",
      }
    }
    return { url, domain: parsed.hostname, title: url, status: "unavailable" }
  } catch {
    return undefined
  }
}

export function LinkPreviewCard({
  preview,
  compact = false,
}: {
  preview: LinkPreview
  compact?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-muted transition-colors hover:bg-muted/80">
      <a
        href={preview.url}
        target="_blank"
        rel="noreferrer noopener"
        className="block"
      >
        {!compact && preview.imageUrl ? (
          <img
            src={preview.imageUrl}
            alt=""
            className="aspect-[2.4/1] w-full object-cover"
          />
        ) : null}
        <div className="flex items-center gap-3 p-3">
          {compact && preview.imageUrl ? (
            <img
              src={preview.imageUrl}
              alt=""
              className="size-14 shrink-0 rounded-md object-cover"
            />
          ) : null}
          {compact && !preview.imageUrl ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
              <Link2 aria-hidden="true" />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              {preview.siteName ?? preview.domain}
            </p>
            <p className="line-clamp-2 text-sm leading-5 font-medium">
              {preview.title}
            </p>
            {!compact && preview.description ? (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {preview.description}
              </p>
            ) : null}
          </div>
        </div>
      </a>
    </div>
  )
}

export function NewsfeedComposer({
  currentRole,
  currentUserName,
  onPublish,
}: {
  currentRole: UserRole
  currentUserName: string
  onPublish: (post: Post) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [content, setContent] = useState("")
  const [media, setMedia] = useState<MediaItem[]>([])
  const [progress, setProgress] = useState(0)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState("")
  const mediaRef = useRef<MediaItem[]>([])

  useEffect(() => {
    mediaRef.current = media
  }, [media])
  useEffect(
    () => () => {
      mediaRef.current.forEach((item) => {
        if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url)
      })
    },
    []
  )

  function openComposer() {
    setExpanded(true)
    window.requestAnimationFrame(() => textareaRef.current?.focus())
  }

  function closeComposer() {
    setExpanded(false)
    setError("")
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    setError("")
    if (media.length + files.length > MAX_FILES) {
      setError(`You can attach up to ${MAX_FILES} files.`)
      return
    }
    const invalid = files.find(
      (file) => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
    )
    if (invalid) {
      setError(`${invalid.name} is not supported or is larger than 25 MB.`)
      return
    }
    setMedia((current) => [
      ...current,
      ...files.map(
        (file) =>
          ({
            id: `${file.name}-${file.lastModified}`,
            type: file.type.startsWith("video/") ? "video" : "image",
            url: URL.createObjectURL(file),
            alt: file.name,
            mimeType: file.type,
            uploadStatus: "uploading",
            uploadProgress: 15,
          }) as MediaItem
      ),
    ])
    if (inputRef.current) inputRef.current.value = ""
    window.setTimeout(
      () =>
        setMedia((current) =>
          current.map((item) => ({
            ...item,
            uploadStatus: "uploaded",
            uploadProgress: 100,
          }))
        ),
      500
    )
  }

  function publish() {
    if (!content.trim() && !media.length && !preview) {
      setError("Add text, media, or a link before publishing.")
      return
    }
    if (media.some((item) => item.uploadStatus !== "uploaded")) {
      setError("Wait for your uploads to finish before publishing.")
      return
    }
    setPublishing(true)
    setProgress(35)
    window.setTimeout(() => {
      const now = new Date().toISOString()
      onPublish({
        id: `post-${Date.now()}`,
        author: {
          id: "user-student",
          name: currentUserName,
          role: currentRole,
          roleLabel: roleLabel(currentRole),
        },
        content: content.trim(),
        createdAt: now,
        media,
        externalUrl: preview?.url,
        linkPreview: preview,
        likeCount: 0,
        commentCount: 0,
        likedByCurrentUser: false,
        savedByCurrentUser: false,
        comments: [],
        commentsExpanded: false,
        canEdit: true,
        canDelete: true,
      })
      setContent("")
      setMedia([])
      setProgress(100)
      setPublishing(false)
      setError("")
      setExpanded(false)
      toast.success("Post published in demo mode.")
    }, 650)
  }

  const preview = getPreview(detectUrl(content))

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-[0_4px_16px_rgba(24,24,27,0.06)]">
      {!expanded ? (
        <CardContent className="p-0">
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onClick={openComposer}
          >
            <RoleAvatar
              name={currentUserName}
              role={currentRole === "job_seeker" ? "job-seeker" : currentRole}
              showBadge={false}
            />
            <span className="text-base text-muted-foreground">
              What&apos;s on your mind?
            </span>
          </button>
        </CardContent>
      ) : (
        <>
          <CardHeader className="flex flex-row items-center justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <RoleAvatar
                name={currentUserName}
                role={currentRole === "job_seeker" ? "job-seeker" : currentRole}
                showBadge={false}
              />
              <div className="min-w-0">
                <p className="font-medium">{currentUserName}</p>
                <p className="text-sm text-muted-foreground">
                  Share with the Era community
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close composer"
              onClick={closeComposer}
            >
              <X data-icon="inline-start" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-4 pt-0 pb-3">
            <div className="overflow-hidden rounded-2xl bg-muted">
              <Textarea
                ref={textareaRef}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="What are you learning, building, or looking for?"
                aria-label="Create a post"
                className="min-h-32 resize-none border-0 bg-transparent px-4 py-3 text-base shadow-none focus-visible:border-0 focus-visible:ring-0"
              />
            </div>
            {preview ? <LinkPreviewCard preview={preview} /> : null}
            {media.length ? (
              <div className="grid grid-cols-2 gap-2">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <AspectRatio ratio={1}>
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          className="size-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="size-full object-cover"
                        />
                      )}
                    </AspectRatio>
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        if (item.url.startsWith("blob:"))
                          URL.revokeObjectURL(item.url)
                        setMedia((current) =>
                          current.filter((entry) => entry.id !== item.id)
                        )
                      }}
                      aria-label={`Remove ${item.alt}`}
                    >
                      <X data-icon="inline-start" />
                    </Button>
                    {item.uploadStatus === "uploading" ? (
                      <Progress
                        value={item.uploadProgress}
                        className="absolute right-2 bottom-2 left-2"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            {publishing ? (
              <div className="flex flex-col gap-1">
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground">
                  Publishing your post…
                </p>
              </div>
            ) : null}
          </CardContent>
          <CardFooter className="justify-between gap-2 px-4 pt-1 pb-4">
            <div className="flex items-center gap-1">
              <Input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                multiple
                className="sr-only"
                onChange={handleFiles}
              />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Add image"
                onClick={() => inputRef.current?.click()}
              >
                <ImageIcon data-icon="inline-start" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Add attachment"
                onClick={() => inputRef.current?.click()}
              >
                <Paperclip data-icon="inline-start" />
              </Button>
            </div>
            <Button onClick={publish} disabled={publishing}>
              Post
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
