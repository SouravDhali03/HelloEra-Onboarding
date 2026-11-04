import { Button } from "@/components/ui/button"

export function SocialLoginButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button type="button" variant="outline" size="lg" className="w-full">
        <GoogleMark />
        Google
      </Button>
      <Button type="button" variant="outline" size="lg" className="w-full">
        <FacebookMark />
        Facebook
      </Button>
    </div>
  )
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path fill="#4285F4" d="M21.35 12.27c0-.75-.07-1.47-.21-2.17H12v4.1h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.29Z" />
      <path fill="#34A853" d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.6Z" />
      <path fill="#FBBC05" d="M6.54 13.7A5.84 5.84 0 0 1 6.23 12c0-.59.11-1.17.31-1.7V7.79H3.3A9.73 9.73 0 0 0 2.27 12c0 1.52.36 2.96 1.03 4.21l3.24-2.51Z" />
      <path fill="#EA4335" d="M12 6.27c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.36 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.7 5.39l3.24 2.51C7.31 7.99 9.46 6.27 12 6.27Z" />
    </svg>
  )
}

function FacebookMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path fill="#1877F2" d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.24 10.44 22V14.91H7.9v-2.85h2.54v-2.17c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.85h2.76l-.44 2.85h-2.32V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  )
}
