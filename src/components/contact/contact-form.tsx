"use client"

import { useActionState, useEffect } from "react"
import { Check, Loader2 } from "lucide-react"
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const control = "h-11 rounded-lg border-line-strong bg-paper px-3.5 text-[15px] shadow-none focus-visible:border-ink focus-visible:ring-0"

export function ContactForm({ sectors }: { sectors: string[] }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" })
  const errors = state.status === "invalid" ? state.errors : {}

  // With no mail service connected, the visitor's own email app sends it.
  useEffect(() => {
    if (state.status === "handoff") window.location.href = state.mailto
  }, [state])

  if (state.status === "sent") {
    return (
      <div className="rounded-card border border-line bg-paper p-8" role="status">
        <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper">
          <Check className="size-5" aria-hidden />
        </span>
        <h2 className="mt-6 text-[22px] font-semibold tracking-tight">Message received.</h2>
        <p className="mt-2 text-[16px] leading-relaxed text-steel">Thank you. Someone from the team will reply by email within one working day.</p>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="space-y-5 rounded-card border border-line bg-paper p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} className={control} />
        </Field>
        <Field label="Work email" name="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} className={control} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" optional>
          <Input id="company" name="company" autoComplete="organization" className={control} />
        </Field>
        <Field label="Sector" name="sector" optional>
          <select id="sector" name="sector" defaultValue="" className={`${control} w-full border outline-none`}>
            <option value="">Choose one</option>
            {sectors.map((name) => (
              <option key={name}>{name}</option>
            ))}
            <option>Something else</option>
          </select>
        </Field>
      </div>
      <Field label="What do you need?" name="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          placeholder="How many locations you run, what you stock and what is not working today."
          className={`${control} h-auto py-3 leading-relaxed`}
        />
      </Field>

      {/* Hidden from people. A filled value marks the sender as a bot. */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "handoff" || state.status === "failed" ? (
        <p className="rounded-lg border border-line bg-mist p-4 text-[15px] leading-relaxed" role="status">
          {state.status === "failed" ? "We could not send that from here. " : "Your email app should have opened with the message ready. "}
          <a href={state.mailto} className="link font-medium">
            Send it by email instead
          </a>
          .
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {pending ? "Sending" : "Send message"}
      </button>
    </form>
  )
}

function Field({ label, name, error, optional, children }: { label: string; name: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {optional ? <span className="font-normal text-steel">optional</span> : null}
      </Label>
      {children}
      {error ? <p className="text-sm text-vault-red">{error}</p> : null}
    </div>
  )
}
