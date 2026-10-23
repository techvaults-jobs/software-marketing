"use client"

import { useActionState } from "react"
import { signIn, type SignInState } from "./actions"

export function SignInForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {})
  return (
    <form action={action} className="mt-8 max-w-sm space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(state.error)}
          className="h-11 w-full rounded-lg border border-line-strong bg-paper px-3.5 text-[15px] outline-none focus-visible:border-ink"
        />
        {state.error ? <p className="text-sm text-vault-red">{state.error}</p> : null}
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Checking" : "Sign in"}
      </button>
    </form>
  )
}
