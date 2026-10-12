import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE = "tv_admin"
const HOURS = 12

function secret() {
  return process.env.ADMIN_PASSWORD ?? ""
}

/** Admin pages stay closed until a password of real length is configured. */
export function adminConfigured() {
  return secret().length >= 12
}

function sign(expires: number) {
  return createHmac("sha256", secret()).update(`enquiries:${expires}`).digest("hex")
}

function same(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export function passwordMatches(candidate: string) {
  if (!adminConfigured()) return false
  // Compare digests so the check takes the same time whatever was typed.
  const digest = (value: string) => createHmac("sha256", "tv-admin-login").update(value).digest("hex")
  return same(digest(candidate), digest(secret()))
}

/** The cookie is the expiry time plus a signature only this server can make. */
export async function startSession() {
  const expires = Date.now() + HOURS * 60 * 60 * 1000
  const store = await cookies()
  store.set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    expires: new Date(expires),
  })
}

export async function endSession() {
  const store = await cookies()
  store.set(COOKIE, "", { path: "/admin", maxAge: 0 })
}

export async function isSignedIn() {
  if (!adminConfigured()) return false
  const value = (await cookies()).get(COOKIE)?.value ?? ""
  const [expiresText, signature] = value.split(".")
  const expires = Number(expiresText)
  if (!signature || !Number.isFinite(expires) || expires < Date.now()) return false
  return same(signature, sign(expires))
}
