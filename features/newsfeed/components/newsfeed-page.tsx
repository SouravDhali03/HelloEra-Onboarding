"use client"

/* Native media is intentional for user-provided and external URLs. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import {
  Bookmark,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Send,
  Share2,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"

import { RoleAvatar } from "@/components/account-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { createPostShareUrl } from "@/lib/share-url"
import { Textarea } from "@/components/ui/textarea"
import { getStoredUserName } from "@/lib/user-profile"
import { LinkPreviewCard, NewsfeedComposer } from "./newsfeed-composer"
import { useNewsfeedStore } from "../hooks/use-newsfeed-store"
import { mockAdvertisements } from "../data/mock-newsfeed-data"
import type { Comment, MediaItem, Post, UserRole } from "../types"

const fallbackUserName = "Sourav Dhali"
const subscribeToUserName = () => () => undefined
const getClientUserName = () => getStoredUserName() || fallbackUserName
const getServerUserName = () => fallbackUserName

function roleAvatarRole(role: UserRole) {
  return role === "job_seeker" ? "job-seeker" : role
}

function roleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    student: "Student",
    job_seeker: "Career / Job Seeker",
    freelancer: "Freelancer",
    tutor: "Tutor",
    seller: "Seller",
    employer: "Employer",
  }
  return labels[role]
}

async function sharePost(postId: string) {
  const url = createPostShareUrl(postId)
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
  const seconds = Math.max(
    1,
    Math.floor((Date.now() - new Date(value).getTime()) / 1000)
  )
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

function CommentContent({ comment }: { comment: Comment }) {
  if (!comment.replyTo) {
    return <p className="mt-1 text-sm whitespace-pre-wrap">{comment.content}</p>
  }

  const mention = `@${comment.replyTo.name}`
  const content = comment.content.startsWith(`${mention} `)
    ? comment.content.slice(mention.length + 1)
    : comment.content

  return (
    <p className="mt-1 text-sm whitespace-pre-wrap">
      <Link
        href={`/profile/${comment.replyTo.id}`}
        className="font-medium text-primary hover:underline"
      >
        {comment.replyTo.name}
      </Link>
      {content ? ` ${content}` : null}
    </p>
  )
}

function sponsorWebsite(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function MediaGrid({ media }: { media: MediaItem[] }) {
  if (!media.length) return null
  return (
    <div
      className={cn(
        "grid gap-0 overflow-hidden rounded-none",
        media.length === 1 ? "grid-cols-1" : "grid-cols-2"
      )}
    >
      {media.slice(0, 4).map((item) => (
        <AspectRatio
          key={item.id}
          ratio={media.length === 1 ? 16 / 9 : 1}
          className={cn(
            media.length === 3 && item.id === media[0].id && "row-span-2"
          )}
        >
          {item.type === "video" ? (
            <video
              className="size-full rounded-none object-cover"
              controls
              preload="none"
              poster={item.thumbnailUrl}
              aria-label={item.alt}
            >
              <source src={item.url} type={item.mimeType ?? "video/mp4"} />
            </video>
          ) : (
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              className="size-full rounded-none object-cover"
            />
          )}
        </AspectRatio>
      ))}
    </div>
  )
}

function CommentRow({
  comment,
  onDelete,
  onEdit,
  onReply,
  onReport,
}: {
  comment: Comment
  onDelete: (comment: Comment) => void
  onEdit: (comment: Comment) => void
  onReply: (comment: Comment) => void
  onReport: (comment: Comment) => void
}) {
  const isOwned = comment.canEdit || comment.canDelete
  const [liked, setLiked] = useState(comment.likedByCurrentUser)
  const [likeCount, setLikeCount] = useState(comment.likeCount)
  return (
    <div className="flex gap-2.5">
      <RoleAvatar
        name={comment.author.name}
        role={roleAvatarRole(comment.author.role)}
        showBadge={false}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{comment.author.name}</p>
          <span className="ml-auto text-xs text-muted-foreground">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <CommentContent comment={comment} />
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          {isOwned ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="-ml-2 size-7"
                  aria-label={`More actions for ${comment.author.name}'s comment`}
                >
                  <MoreHorizontal data-icon="inline-start" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  {comment.canEdit ? (
                    <DropdownMenuItem onSelect={() => onEdit(comment)}>
                      <Pencil data-icon="inline-start" />
                      Edit
                    </DropdownMenuItem>
                  ) : null}
                  {comment.canDelete ? (
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={() => onDelete(comment)}
                    >
                      <Trash2 data-icon="inline-start" />
                      Delete
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 px-0 hover:bg-transparent",
                  liked && "font-medium text-primary"
                )}
                onClick={() => {
                  setLiked(!liked)
                  setLikeCount(likeCount + (liked ? -1 : 1))
                }}
              >
                Like {likeCount ? `· ${likeCount}` : ""}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-0 hover:bg-transparent"
                onClick={() => onReply(comment)}
              >
                Reply
              </Button>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="-ml-1 size-7"
                    aria-label={`More actions for ${comment.author.name}'s comment`}
                  >
                    <MoreHorizontal data-icon="inline-start" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={() => onReport(comment)}>
                    <Flag data-icon="inline-start" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        {comment.replies?.length ? (
          <div className="mt-3 flex flex-col gap-3 pl-3">
            {comment.replies.map((reply) => (
              <CommentRow
                key={reply.id}
                comment={reply}
                onDelete={onDelete}
                onEdit={onEdit}
                onReply={onReply}
                onReport={onReport}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function PostMenu({
  post,
  onEdit,
  onDelete,
  onSave,
  onReport,
  onShare,
}: {
  post: Post
  onEdit: () => void
  onDelete: () => void
  onSave: () => void
  onReport: () => void
  onShare: () => void
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`More actions for ${post.author.name}`}
        >
          <MoreHorizontal data-icon="inline-start" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {post.canEdit ? (
            <DropdownMenuItem onSelect={onEdit}>
              <Pencil data-icon="inline-start" />
              Edit post
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem onSelect={onSave}>
            <Bookmark data-icon="inline-start" />
            {post.savedByCurrentUser ? "Remove from Saved" : "Save post"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onShare}>
            <Share2 data-icon="inline-start" />
            Share
          </DropdownMenuItem>
          {!post.canEdit ? (
            <DropdownMenuItem onSelect={onReport}>
              <Flag data-icon="inline-start" />
              Report
            </DropdownMenuItem>
          ) : null}
          {post.canDelete ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={onDelete}>
                <Trash2 data-icon="inline-start" />
                Delete post
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PostCard({
  post,
  currentUserName,
  activeRole,
  onLike,
  onSave,
  onDelete,
  onUpdate,
  onComment,
  onUpdateComment,
  onDeleteComment,
  onToggleComments,
}: {
  post: Post
  currentUserName: string
  activeRole: UserRole
  onLike: () => void
  onSave: () => void
  onDelete: () => void
  onUpdate: (content: string) => void
  onComment: (comment: Comment) => void
  onUpdateComment: (commentId: string, content: string) => void
  onDeleteComment: (commentId: string) => void
  onToggleComments: () => void
}) {
  const [editOpen, setEditOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [commentText, setCommentText] = useState("")
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [textExpanded, setTextExpanded] = useState(false)
  const [commentEditOpen, setCommentEditOpen] = useState(false)
  const [commentDeleteOpen, setCommentDeleteOpen] = useState(false)
  const [commentReportOpen, setCommentReportOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [commentEditContent, setCommentEditContent] = useState("")
  const [replyTarget, setReplyTarget] = useState<Comment | null>(null)
  const visibleComments = post.commentsExpanded
    ? post.comments
    : post.comments.slice(0, 2)

  function submitComment() {
    const content = commentText.trim()
    if (!content) return
    onComment({
      id: `comment-${Date.now()}`,
      author: {
        id: `user-${activeRole}`,
        name: currentUserName,
        role: activeRole,
        roleLabel: roleLabel(activeRole),
      },
      content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      likedByCurrentUser: false,
      parentCommentId: replyTarget?.id ?? null,
      replyTo: replyTarget
        ? { id: replyTarget.author.id, name: replyTarget.author.name }
        : undefined,
      canEdit: true,
      canDelete: true,
    })
    setCommentText("")
    setReplyTarget(null)
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-start gap-3 px-4 pt-4 pb-3">
        <RoleAvatar
          name={post.author.name}
          role={roleAvatarRole(post.author.role)}
          size="lg"
          showBadge={false}
        />
        <div className="min-w-0 flex-1">
          <CardTitle className="text-base leading-5">
            {post.author.name}
          </CardTitle>
          <CardDescription className="mt-0.5">
            {timeAgo(post.createdAt)} ago {post.updatedAt ? "· edited" : ""}
          </CardDescription>
        </div>
        <PostMenu
          post={post}
          onEdit={() => {
            setEditContent(post.content)
            setEditOpen(true)
          }}
          onDelete={() => setDeleteOpen(true)}
          onSave={onSave}
          onReport={() => setReportOpen(true)}
          onShare={() => void sharePost(post.id)}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4 pt-2 pb-4">
        <div className="flex flex-col gap-3">
          <Collapsible open={textExpanded} onOpenChange={setTextExpanded}>
            <p
              className={cn(
                "text-sm leading-6 whitespace-pre-wrap",
                post.content.length > 240 && !textExpanded && "line-clamp-4"
              )}
            >
              {post.content}
            </p>
            {post.content.length > 240 ? (
              <CollapsibleTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0">
                  {textExpanded ? "See less" : "See more"}
                </Button>
              </CollapsibleTrigger>
            ) : null}
          </Collapsible>
          {post.linkPreview ? (
            <LinkPreviewCard
              preview={post.linkPreview}
              compact={post.media.length > 0}
            />
          ) : null}
        </div>
        {post.media.length ? (
          <div className="-mx-4">
            <MediaGrid media={post.media} />
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="px-4 pt-1 pb-4">
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 px-0 hover:bg-transparent"
            onClick={onLike}
            aria-label={post.likedByCurrentUser ? "Unlike post" : "Like post"}
          >
            <Heart
              data-icon="inline-start"
              className={
                post.likedByCurrentUser
                  ? "fill-current text-primary"
                  : undefined
              }
            />
            <span>{post.likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 gap-2 px-2",
              commentsOpen
                ? "bg-muted text-foreground hover:bg-muted"
                : "hover:bg-transparent"
            )}
            onClick={() => {
              setCommentsOpen(!commentsOpen)
              if (commentsOpen) {
                setCommentText("")
                setReplyTarget(null)
              }
            }}
            aria-label="Comment on post"
            aria-expanded={commentsOpen}
          >
            <MessageCircle data-icon="inline-start" />
            <span>{post.commentCount}</span>
          </Button>
        </div>
      </CardFooter>
      {commentsOpen ? (
        <CardContent
          data-slot="post-comments"
          className="flex flex-col gap-4 border-t px-4 pt-4 pb-4"
        >
          {visibleComments.length ? (
            <div className="flex flex-col gap-4">
              {visibleComments.map((comment) => (
                <CommentRow
                  key={comment.id}
                  comment={comment}
                  onEdit={(targetComment) => {
                    setSelectedComment(targetComment)
                    setCommentEditContent(targetComment.content)
                    setCommentEditOpen(true)
                  }}
                  onDelete={(targetComment) => {
                    setSelectedComment(targetComment)
                    setCommentDeleteOpen(true)
                  }}
                  onReply={(targetComment) => {
                    setReplyTarget(targetComment)
                    setCommentText(`@${targetComment.author.name} `)
                  }}
                  onReport={(targetComment) => {
                    setSelectedComment(targetComment)
                    setCommentReportOpen(true)
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="py-2 text-sm text-muted-foreground">
              No comments yet. Start the conversation.
            </p>
          )}
          {post.comments.length > 2 ? (
            <Button
              variant="link"
              size="sm"
              className="w-fit px-0"
              onClick={onToggleComments}
            >
              {post.commentsExpanded
                ? "Show fewer comments"
                : `View all ${post.comments.length} comments`}
            </Button>
          ) : null}
          <div className="flex items-end gap-2 border-t pt-4">
            <Textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder={
                replyTarget
                  ? `Replying to ${replyTarget.author.name}...`
                  : "Write a comment..."
              }
              aria-label="Write a comment"
              className="min-h-10 resize-none"
            />
            <Button
              size="icon"
              aria-label="Post comment"
              onClick={submitComment}
            >
              <Send data-icon="inline-start" />
            </Button>
          </div>
        </CardContent>
      ) : null}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>
              Update your post text. Media and link previews remain unchanged.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editContent}
            onChange={(event) => setEditContent(event.target.value)}
            aria-label="Post content"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                onUpdate(editContent.trim())
                setEditOpen(false)
                toast.success("Post updated.")
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report post</DialogTitle>
            <DialogDescription>
              Choose a reason. This frontend demonstration does not submit a
              real moderation report.
            </DialogDescription>
          </DialogHeader>
          <Select defaultValue="spam">
            <SelectTrigger>
              <SelectValue placeholder="Choose a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spam">Spam or misleading</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="unsafe">Unsafe content</SelectItem>
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Additional details (optional)"
            aria-label="Report details"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setReportOpen(false)
                toast.success("Thanks. Your report was received in demo mode.")
              }}
            >
              Submit report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={commentEditOpen} onOpenChange={setCommentEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit comment</DialogTitle>
            <DialogDescription>
              Update your comment before saving the changes.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={commentEditContent}
            onChange={(event) => setCommentEditContent(event.target.value)}
            aria-label="Comment content"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={!commentEditContent.trim() || !selectedComment}
              onClick={() => {
                if (!selectedComment) return
                onUpdateComment(selectedComment.id, commentEditContent.trim())
                setCommentEditOpen(false)
                toast.success("Comment updated.")
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={commentDeleteOpen} onOpenChange={setCommentDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes your comment from the local demonstration
              feed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (!selectedComment) return
                onDeleteComment(selectedComment.id)
                setCommentDeleteOpen(false)
                toast.success("Comment deleted.")
              }}
            >
              Delete comment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={commentReportOpen} onOpenChange={setCommentReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report comment</DialogTitle>
            <DialogDescription>
              Choose a reason. This frontend demonstration does not submit a
              real moderation report.
            </DialogDescription>
          </DialogHeader>
          <Select defaultValue="spam">
            <SelectTrigger>
              <SelectValue placeholder="Choose a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spam">Spam or misleading</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="unsafe">Unsafe content</SelectItem>
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Additional details (optional)"
            aria-label="Report comment details"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setCommentReportOpen(false)
                toast.success("Thanks. Your report was received in demo mode.")
              }}
            >
              Submit report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the post from the local demonstration feed and Saved
              view.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDelete}>
              Delete post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

function AdvertisementRail() {
  const ads = useMemo(
    () =>
      mockAdvertisements
        .filter((ad) => ad.isActive)
        .sort((a, b) => b.priority - a.priority),
    []
  )
  return ads.length ? (
    <aside
      data-slot="sponsored-rail"
      aria-label="Sponsored resources"
      className="hidden w-72 shrink-0 flex-col gap-4 xl:flex"
    >
      <div className="flex items-center">
        <h2 className="text-sm font-medium">Sponsored</h2>
      </div>
      {ads.map((ad) => (
        <Card key={ad.id} className="overflow-hidden p-0">
          <a
            href={ad.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[2.1/1] overflow-hidden"
          >
            <img
              src={ad.imageUrl}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0 p-4 text-white">
              <p className="text-sm leading-5 font-medium">{ad.title}</p>
              <p className="text-xs text-white/80">
                {sponsorWebsite(ad.targetUrl)}
              </p>
            </div>
          </a>
        </Card>
      ))}
    </aside>
  ) : null
}

export function NewsfeedPage({
  activeRole = "student",
}: {
  activeRole?: UserRole
}) {
  const {
    posts,
    toggleLike,
    toggleSave,
    addPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
    toggleComments,
  } = useNewsfeedStore()
  const currentUserName = useSyncExternalStore(
    subscribeToUserName,
    getClientUserName,
    getServerUserName
  )
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 250)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <section
      data-slot="newsfeed-page"
      aria-label="Newsfeed page"
      className="w-full bg-muted/20 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div
        data-slot="newsfeed-content-container"
        className="mx-auto flex w-full max-w-none items-start justify-between gap-6"
      >
        <main
          data-slot="newsfeed-column"
          className="mx-auto flex w-full max-w-lg min-w-0 flex-col gap-4"
          aria-label="Newsfeed"
        >
          <NewsfeedComposer
            currentRole={activeRole}
            currentUserName={currentUserName}
            onPublish={addPost}
          />
          {loading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-80 w-full" />
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserName={currentUserName}
                activeRole={activeRole}
                onLike={() => toggleLike(post.id)}
                onSave={() => {
                  toggleSave(post.id)
                  toast.success(
                    post.savedByCurrentUser
                      ? "Removed from Saved."
                      : "Saved for later."
                  )
                }}
                onDelete={() => {
                  deletePost(post.id)
                  toast.success("Post deleted.")
                }}
                onUpdate={(content) => updatePost(post.id, content)}
                onComment={(comment) => addComment(post.id, comment)}
                onUpdateComment={(commentId, content) =>
                  updateComment(post.id, commentId, content)
                }
                onDeleteComment={(commentId) =>
                  deleteComment(post.id, commentId)
                }
                onToggleComments={() => toggleComments(post.id)}
              />
            ))
          )}
        </main>
        <AdvertisementRail />
      </div>
    </section>
  )
}
