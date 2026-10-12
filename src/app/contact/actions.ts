"use server"

import { site } from "@/content/site"
import { hasDatabase } from "@/lib/db"
import { saveEnquiry } from "@/lib/enquiries"

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Record<string, string> }
  /** Nowhere to store or send it: hand the visitor a ready-written email. */
  | { status: "handoff"; mailto: string }
  | { status: "failed"; mailto: string }

const text = (form: FormData, key: string, max: number) => String(form.get(key) ?? "").trim().slice(0, max)

export async function sendEnquiry(_previous: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Filled only by bots: the field is hidden from people.
  if (text(form, "website", 200)) return { status: "sent" }

  const enquiry = {
    name: text(form, "name", 120),
    email: text(form, "email", 200),
    company: text(form, "company", 160),
    sector: text(form, "sector", 80),
    message: text(form, "message", 4000),
  }

  const errors: Record<string, string> = {}
  if (!enquiry.name) errors.name = "Tell us your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) errors.email = "Enter an email address we can reply to."
  if (enquiry.message.length < 10) errors.message = "A sentence or two about your business helps us prepare."
  if (Object.keys(errors).length) return { status: "invalid", errors }

  const subject = `Enquiry from ${enquiry.name}${enquiry.company ? `, ${enquiry.company}` : ""}`
  const body = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company || "-"}`,
    `Sector: ${enquiry.sector || "-"}`,
    "",
    enquiry.message,
  ].join("\n")
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  // The database is the record. Email is a courtesy on top of it.
  let saved = false
  if (hasDatabase()) {
    try {
      await saveEnquiry(enquiry)
      saved = true
    } catch (error) {
      console.error("Enquiry could not be saved.", error)
    }
  }

  const notified = await notify(subject, body, enquiry.email)
  if (saved || notified) return { status: "sent" }
  return hasDatabase() || mailConfigured() ? { status: "failed", mailto } : { status: "handoff", mailto }
}

function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO && process.env.CONTACT_FROM)
}

/** Emails the team through Resend when it is set up. Never throws. */
async function notify(subject: string, body: string, replyTo: string) {
  if (!mailConfigured()) return false
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.CONTACT_FROM, to: [process.env.CONTACT_TO], reply_to: replyTo, subject, text: body }),
    })
    return response.ok
  } catch {
    return false
  }
}
