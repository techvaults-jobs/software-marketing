import { Suspense } from "react"
import type { Metadata } from "next"
import { connection } from "next/server"
import { adminConfigured, isSignedIn } from "@/lib/admin-session"
import { hasDatabase } from "@/lib/db"
import { listEnquiries, type Enquiry } from "@/lib/enquiries"
import { markHandled, signOut } from "./actions"
import { SignInForm } from "./sign-in-form"

export const metadata: Metadata = { title: "Enquiries", robots: { index: false, follow: false } }

export default function AdminPage() {
  return (
    <main id="main" className="flex-1">
      <div className="frame">
        <div className="pad min-h-[60vh] py-12 sm:py-16">
          <p className="eyebrow mb-4">Team only</p>
          <h1 className="title">Enquiries</h1>
          <Suspense fallback={<p className="mt-8 text-steel">Loading</p>}>
            <Inbox />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

async function Inbox() {
  // Settings and messages are read per request, never baked in at build time.
  await connection()
  if (!adminConfigured()) {
    return <p className="lede mt-5 max-w-[56ch]">This page is switched off. Set ADMIN_PASSWORD (12 characters or more) on the server to open it.</p>
  }
  if (!(await isSignedIn())) return <SignInForm />
  if (!hasDatabase()) {
    return <p className="lede mt-5 max-w-[56ch]">No database is connected, so there is nothing to show. Set DATABASE_URL on the server.</p>
  }

  const enquiries = await listEnquiries()
  const open = enquiries.filter((enquiry) => !enquiry.handledAt).length

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="lede">
          {enquiries.length ? `${open} waiting, ${enquiries.length - open} handled.` : "No messages yet. They will appear here as soon as someone writes in."}
        </p>
        <form action={signOut}>
          <button type="submit" className="btn btn-sm btn-outline">
            Sign out
          </button>
        </form>
      </div>
      <ul className="mt-8 space-y-4">
        {enquiries.map((enquiry) => (
          <EnquiryCard key={enquiry.id} enquiry={enquiry} />
        ))}
      </ul>
    </>
  )
}

const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" })

function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const handled = Boolean(enquiry.handledAt)
  return (
    <li className={`rounded-card border border-line p-5 sm:p-6 ${handled ? "bg-mist" : "bg-paper"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
            {handled ? null : <span className="size-1.5 shrink-0 rounded-full bg-vault-red" aria-label="Waiting" />}
            {enquiry.name}
            {enquiry.company ? <span className="font-normal text-steel">· {enquiry.company}</span> : null}
          </p>
          <p className="mt-1 text-sm text-steel">
            <a href={`mailto:${enquiry.email}`} className="link text-ink">
              {enquiry.email}
            </a>
            {enquiry.sector ? ` · ${enquiry.sector}` : ""} · {when.format(enquiry.createdAt)} (Lagos)
          </p>
        </div>
        <form action={markHandled}>
          <input type="hidden" name="id" value={enquiry.id} />
          <input type="hidden" name="handled" value={String(!handled)} />
          <button type="submit" className={`btn btn-sm ${handled ? "btn-outline" : "btn-ink"}`}>
            {handled ? "Reopen" : "Mark handled"}
          </button>
        </form>
      </div>
      <p className="mt-4 max-w-[80ch] text-[15px] leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
    </li>
  )
}
