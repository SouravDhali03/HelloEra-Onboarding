"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bookmark,
  ExternalLink,
  Flag,
  Heart,
  Link2,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Send,
  Share2,
  Trash2,
  Upload,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"

import { RoleAvatar } from "@/components/account-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useNewsfeedStore } from "../hooks/use-newsfeed-store"
import { mockAdvertisements } from "../data/mock-newsfeed-data"
import type { Comment, LinkPreview, MediaItem, Post, UserRole } from "../types"

const MAX_FILES = 8
const MAX_FILE_SIZE = 25 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"]

function roleAvatarRole(role: UserRole) {
  return role === "job_seeker" ? "job-seeker" : role
}

function roleLabel(role: string) {
  return ({
    student: "Student",
    job_seeker: "Career / Job Seeker",
    "job-seeker": "Career / Job Seeker",
    freelancer: "Freelancer",
    tutor: "Tutor",
    seller: "Seller",
    employer: "Employer",
  } as Record<string, string>)[role] ?? role
}

async function sharePost(postId: string) {
  const url = `${window.location.origin}/dashboard#post-${postId}`
  try {
    if (navigator.share) {
      await navigator.share({ title: "Era Newsfeed", url })
      toast.success("Post shared.")
    } else {
      await navigator.clipboard.writeText(url)
      toast.success("Post link copied.")
    }
  } catch {
    toast.error("The post could not be shared.")
  }
}

function timeAgo(value: string) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000))
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
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
        description: "Preview metadata is simulated for this frontend demonstration.",
        status: "ready",
      }
    }
    return { url, domain: parsed.hostname, title: url, status: "unavailable" }
  } catch {
    return undefined
  }
}

function LinkPreviewCard({ preview, compact = false }: { preview: LinkPreview; compact?: boolean }) {
  return (
    <a href={preview.url} target="_blank" rel="noreferrer noopener" className="group/link block overflow-hidden rounded-xl border bg-muted/30 transition-colors hover:bg-muted/60">
      {!compact && preview.imageUrl ? <img src={preview.imageUrl} alt="" className="aspect-[2.4/1] w-full object-cover" /> : null}
      <div className="flex items-start gap-3 p-3">
        {compact ? <Link2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted-foreground">{preview.siteName ?? preview.domain}</p>
          <p className="line-clamp-2 text-sm font-medium group-hover/link:underline">{preview.title}</p>
          {!compact && preview.description ? <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{preview.description}</p> : null}
        </div>
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>
    </a>
  )
}

function MediaGrid({ media }: { media: MediaItem[] }) {
  if (!media.length) return null
  return (
    <div className={cn("grid gap-0 overflow-hidden rounded-none", media.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
      {media.slice(0, 4).map((item) => (
        <AspectRatio key={item.id} ratio={media.length === 1 ? 16 / 9 : 1} className={cn(media.length === 3 && item.id === media[0].id && "row-span-2")}>
          {item.type === "video" ? (
            <video className="size-full rounded-none object-cover" controls preload="none" poster={item.thumbnailUrl} aria-label={item.alt}>
              <source src={item.url} type={item.mimeType ?? "video/mp4"} />
            </video>
          ) : (
            <img src={item.url} alt={item.alt} loading="lazy" className="size-full rounded-none object-cover" />
          )}
        </AspectRatio>
      ))}
    </div>
  )
}

function CommentRow({ comment, onDelete }: { comment: Comment; onDelete: () => void }) {
  const [liked, setLiked] = useState(comment.likedByCurrentUser)
  const [likeCount, setLikeCount] = useState(comment.likeCount)
  return (
    <div className="flex gap-2.5">
      <RoleAvatar role={roleAvatarRole(comment.author.role)} />
      <div className="min-w-0 flex-1 rounded-xl bg-muted/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{comment.author.name}</p>
          <Badge variant="secondary" className="text-[10px]">{comment.author.roleLabel}</Badge>
          <span className="ml-auto text-xs text-muted-foreground">{timeAgo(comment.createdAt)}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm">{comment.content}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <button type="button" className={liked ? "font-medium text-primary" : "hover:text-foreground"} onClick={() => { setLiked(!liked); setLikeCount(likeCount + (liked ? -1 : 1)) }}>
            Like {likeCount ? `· ${likeCount}` : ""}
          </button>
          <button type="button" className="hover:text-foreground">Reply</button>
          {comment.canDelete ? <button type="button" className="hover:text-destructive" onClick={onDelete}>Delete</button> : null}
        </div>
        {comment.replies?.length ? <div className="mt-3 flex flex-col gap-3 border-l pl-3"><CommentRow comment={comment.replies[0]} onDelete={() => undefined} /></div> : null}
      </div>
    </div>
  )
}

function PostMenu({ post, onEdit, onDelete, onSave, onReport, onShare }: { post: Post; onEdit: () => void; onDelete: () => void; onSave: () => void; onReport: () => void; onShare: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${post.author.name}`}><MoreHorizontal data-icon="inline-start" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {post.canEdit ? <DropdownMenuItem onSelect={onEdit}><Pencil data-icon="inline-start" />Edit post</DropdownMenuItem> : null}
          <DropdownMenuItem onSelect={onSave}><Bookmark data-icon="inline-start" />{post.savedByCurrentUser ? "Remove from Saved" : "Save post"}</DropdownMenuItem>
          <DropdownMenuItem onSelect={onShare}><Share2 data-icon="inline-start" />Share</DropdownMenuItem>
          {!post.canEdit ? <DropdownMenuItem onSelect={onReport}><Flag data-icon="inline-start" />Report</DropdownMenuItem> : null}
          {post.canDelete ? <><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onSelect={onDelete}><Trash2 data-icon="inline-start" />Delete post</DropdownMenuItem></> : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PostCard({ post, onLike, onSave, onDelete, onUpdate, onComment, onToggleComments }: { post: Post; onLike: () => void; onSave: () => void; onDelete: () => void; onUpdate: (content: string) => void; onComment: (comment: Comment) => void; onToggleComments: () => void }) {
  const [editOpen, setEditOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [commentText, setCommentText] = useState("")
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [textExpanded, setTextExpanded] = useState(false)
  const visibleComments = post.commentsExpanded ? post.comments : post.comments.slice(0, 2)

  function submitComment() {
    const content = commentText.trim()
    if (!content) return
    onComment({ id: `comment-${Date.now()}`, author: { id: "user-student", name: "Sami Rahman", role: "student", roleLabel: "Student" }, content, createdAt: new Date().toISOString(), likeCount: 0, likedByCurrentUser: false, canEdit: true, canDelete: true })
    setCommentText("")
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-start gap-3 px-4 pb-3 pt-4">
        <RoleAvatar role={roleAvatarRole(post.author.role)} size="lg" />
        <div className="min-w-0 flex-1">
          <CardTitle className="text-base leading-5">{post.author.name}</CardTitle>
          <CardDescription className="mt-0.5">{timeAgo(post.createdAt)} ago {post.updatedAt ? "· edited" : ""}</CardDescription>
        </div>
        <PostMenu post={post} onEdit={() => { setEditContent(post.content); setEditOpen(true) }} onDelete={() => setDeleteOpen(true)} onSave={onSave} onReport={() => setReportOpen(true)} onShare={() => void sharePost(post.id)} />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-2">
        <div className="flex flex-col gap-3">
          <Collapsible open={textExpanded} onOpenChange={setTextExpanded}>
            <p className={cn("whitespace-pre-wrap text-sm leading-6", post.content.length > 240 && !textExpanded && "line-clamp-4")}>{post.content}</p>
            {post.content.length > 240 ? <CollapsibleTrigger asChild><Button variant="link" size="sm" className="h-auto p-0">{textExpanded ? "See less" : "See more"}</Button></CollapsibleTrigger> : null}
          </Collapsible>
          {post.linkPreview ? <LinkPreviewCard preview={post.linkPreview} compact={post.media.length > 0} /> : null}
        </div>
        {post.media.length ? <div className="-mx-4"><MediaGrid media={post.media} /></div> : null}
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-1">
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="h-8 gap-2 px-0 hover:bg-transparent" onClick={onLike} aria-label={post.likedByCurrentUser ? "Unlike post" : "Like post"}><Heart data-icon="inline-start" className={post.likedByCurrentUser ? "fill-current text-primary" : undefined} /><span>{post.likeCount}</span></Button>
          <Button variant="ghost" size="sm" className="h-8 gap-2 px-0 hover:bg-transparent" onClick={() => { setCommentsOpen(!commentsOpen); if (commentsOpen) setCommentText("") }} aria-label="Comment on post" aria-expanded={commentsOpen}><MessageCircle data-icon="inline-start" /><span>{post.commentCount}</span></Button>
        </div>
      </CardFooter>
      {commentsOpen ? <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-0"><div className="flex flex-col gap-3">{visibleComments.map((comment) => <CommentRow key={comment.id} comment={comment} onDelete={() => undefined} />)}</div>{post.comments.length > 2 ? <Button variant="link" size="sm" className="w-fit px-0" onClick={onToggleComments}>{post.commentsExpanded ? "Show fewer comments" : `View all ${post.comments.length} comments`}</Button> : null}<div className="flex items-end gap-2"><Textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Write a comment..." aria-label="Write a comment" className="min-h-10 resize-none" /><Button size="icon" aria-label="Post comment" onClick={submitComment}><Send data-icon="inline-start" /></Button></div></CardContent> : null}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit post</DialogTitle><DialogDescription>Update your post text. Media and link previews remain unchanged.</DialogDescription></DialogHeader>
          <Textarea value={editContent} onChange={(event) => setEditContent(event.target.value)} aria-label="Post content" />
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={() => { onUpdate(editContent.trim()); setEditOpen(false); toast.success("Post updated.") }}>Save changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Report post</DialogTitle><DialogDescription>Choose a reason. This frontend demonstration does not submit a real moderation report.</DialogDescription></DialogHeader>
          <Select defaultValue="spam"><SelectTrigger><SelectValue placeholder="Choose a reason" /></SelectTrigger><SelectContent><SelectItem value="spam">Spam or misleading</SelectItem><SelectItem value="harassment">Harassment</SelectItem><SelectItem value="unsafe">Unsafe content</SelectItem><SelectItem value="other">Something else</SelectItem></SelectContent></Select>
          <Textarea placeholder="Additional details (optional)" aria-label="Report details" />
          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={() => { setReportOpen(false); toast.success("Thanks. Your report was received in demo mode.") }}>Submit report</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this post?</AlertDialogTitle><AlertDialogDescription>This removes the post from the local demonstration feed and Saved view.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={onDelete}>Delete post</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

function Composer({ currentRole, onPublish }: { currentRole: string; onPublish: (post: Post) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState("")
  const [media, setMedia] = useState<MediaItem[]>([])
  const [progress, setProgress] = useState(0)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState("")
  const mediaRef = useRef<MediaItem[]>([])

  useEffect(() => { mediaRef.current = media }, [media])
  useEffect(() => () => { mediaRef.current.forEach((item) => { if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url) }) }, [])

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    setError("")
    if (media.length + files.length > MAX_FILES) { setError(`You can attach up to ${MAX_FILES} files.`); return }
    const invalid = files.find((file) => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE)
    if (invalid) { setError(`${invalid.name} is not supported or is larger than 25 MB.`); return }
    setMedia((current) => [...current, ...files.map((file) => ({ id: `${file.name}-${file.lastModified}`, type: file.type.startsWith("video/") ? "video" : "image", url: URL.createObjectURL(file), alt: file.name, mimeType: file.type, uploadStatus: "uploading", uploadProgress: 15 } as MediaItem))])
    if (inputRef.current) inputRef.current.value = ""
    window.setTimeout(() => setMedia((current) => current.map((item) => ({ ...item, uploadStatus: "uploaded", uploadProgress: 100 }))), 500)
  }

  function publish() {
    if (!content.trim() && !media.length && !preview) { setError("Add text, media, or a link before publishing."); return }
    if (media.some((item) => item.uploadStatus !== "uploaded")) { setError("Wait for your uploads to finish before publishing."); return }
    setPublishing(true); setProgress(35)
    window.setTimeout(() => {
      const now = new Date().toISOString()
      onPublish({ id: `post-${Date.now()}`, author: { id: "user-student", name: "Sami Rahman", role: currentRole as UserRole, roleLabel: roleLabel(currentRole) }, content: content.trim(), createdAt: now, media, externalUrl: preview?.url, linkPreview: preview, likeCount: 0, commentCount: 0, likedByCurrentUser: false, savedByCurrentUser: false, comments: [], commentsExpanded: false, canEdit: true, canDelete: true })
      setContent(""); setMedia([]); setProgress(100); setPublishing(false); setError(""); toast.success("Post published in demo mode.")
    }, 650)
  }

  const detected = detectUrl(content)
  const preview = getPreview(detected)

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Share with the Era community</CardTitle><CardDescription>Post an update, resource, image, or video.</CardDescription></CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="What are you learning, building, or looking for?" aria-label="Create a post" className="min-h-24 resize-none" />
        {preview ? <LinkPreviewCard preview={preview} /> : null}
        {media.length ? <div className="grid grid-cols-2 gap-2">{media.map((item) => <div key={item.id} className="relative overflow-hidden rounded-lg border"><AspectRatio ratio={1}>{item.type === "video" ? <video src={item.url} className="size-full object-cover" muted /> : <img src={item.url} alt={item.alt} className="size-full object-cover" />}</AspectRatio><Button variant="secondary" size="icon-sm" className="absolute top-2 right-2" onClick={() => { if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url); setMedia((current) => current.filter((entry) => entry.id !== item.id)) }} aria-label={`Remove ${item.alt}`}><X data-icon="inline-start" /></Button>{item.uploadStatus === "uploading" ? <Progress value={item.uploadProgress} className="absolute right-2 bottom-2 left-2" /> : null}</div>)}</div> : null}
        {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
        {publishing ? <div className="flex flex-col gap-1"><Progress value={progress} /><p className="text-xs text-muted-foreground">Publishing your post…</p></div> : null}
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <div className="flex items-center gap-1"><Input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} multiple className="sr-only" onChange={handleFiles} /><Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}><Upload data-icon="inline-start" />Add media</Button><span className="text-xs text-muted-foreground">Images and videos</span></div>
        <Button onClick={publish} disabled={publishing}><Send data-icon="inline-start" />Publish</Button>
      </CardFooter>
    </Card>
  )
}

function AdvertisementRail() {
  const ads = useMemo(() => mockAdvertisements.filter((ad) => ad.isActive).sort((a, b) => b.priority - a.priority), [])
  return ads.length ? <aside className="hidden w-72 shrink-0 flex-col gap-4 xl:flex"><div className="flex items-center justify-between"><h2 className="text-sm font-medium">Sponsored</h2><Badge variant="outline">Demo ads</Badge></div>{ads.map((ad) => <Card key={ad.id} className="overflow-hidden"><img src={ad.imageUrl} alt="" className="aspect-[2/1] w-full object-cover" /><CardHeader className="gap-1"><CardTitle className="text-base">{ad.title}</CardTitle><CardDescription>{ad.description}</CardDescription></CardHeader><CardFooter><Button asChild variant="outline" size="sm" className="w-full"><a href={ad.targetUrl} target="_blank" rel="noopener noreferrer">{ad.callToAction}<ExternalLink data-icon="inline-end" /></a></Button></CardFooter></Card>)}</aside> : null
}

export function NewsfeedPage({ activeRole = "student" }: { activeRole?: string }) {
  const { posts, toggleLike, toggleSave, addPost, updatePost, deletePost, addComment, toggleComments } = useNewsfeedStore()
  const [loading, setLoading] = useState(true)
  useEffect(() => { const id = window.setTimeout(() => setLoading(false), 250); return () => window.clearTimeout(id) }, [])
  return (
    <div className="w-full bg-muted/20 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-none items-start justify-between gap-6">
        <main className="mx-auto flex w-full max-w-lg min-w-0 flex-col gap-4" aria-label="Newsfeed">
          <div><h1 className="text-2xl font-medium tracking-tight">Newsfeed</h1><p className="text-sm text-muted-foreground">A shared social space for the Era community.</p></div>
          <Composer currentRole={activeRole} onPublish={addPost} />
          {loading ? <div className="flex flex-col gap-4"><Skeleton className="h-64 w-full" /><Skeleton className="h-80 w-full" /></div> : posts.map((post) => <PostCard key={post.id} post={post} onLike={() => toggleLike(post.id)} onSave={() => { toggleSave(post.id); toast.success(post.savedByCurrentUser ? "Removed from Saved." : "Saved for later.") }} onDelete={() => { deletePost(post.id); toast.success("Post deleted.") }} onUpdate={(content) => updatePost(post.id, content)} onComment={(comment) => addComment(post.id, comment)} onToggleComments={() => toggleComments(post.id)} />)}
        </main>
        <AdvertisementRail />
      </div>
    </div>
  )
}
