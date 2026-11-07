const USER_NAME_COOKIE = "era-name"
const USER_NAME_COOKIE_MAX_AGE = 60 * 60 * 24 * 30

function readCookie(name: string) {
  if (typeof document === "undefined") return ""

  const value =
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? ""

  return decodeURIComponent(value)
}

export function getStoredUserName() {
  return readCookie(USER_NAME_COOKIE)
}

export function setStoredUserName(name: string) {
  if (typeof document === "undefined") return

  document.cookie = `${USER_NAME_COOKIE}=${encodeURIComponent(name)}; path=/; max-age=${USER_NAME_COOKIE_MAX_AGE}`
}
