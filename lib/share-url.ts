export function createPostShareUrl(postId: string) {
  const url = new URL(window.location.href)
  url.hash = `post-${postId}`

  return url.toString()
}
