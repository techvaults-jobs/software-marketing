"use server"

import { revalidatePath } from "next/cache"
import { endSession, isSignedIn, passwordMatches, startSession } from "@/lib/admin-session"
import { setHandled } from "@/lib/enquiries"

export type SignInState = { error?: string }

export async function signIn(_previous: SignInState, form: FormData): Promise<SignInState> {
  // A fixed pause makes guessing passwords slow without locking anyone out.
  await new Promise((resolve) => setTimeout(resolve, 600))
  if (!passwordMatches(String(form.get("password") ?? ""))) return { error: "That password is not right." }
  await startSession()
  revalidatePath("/admin")
  return {}
}

export async function signOut() {
  await endSession()
  revalidatePath("/admin")
}

export async function markHandled(form: FormData) {
  if (!(await isSignedIn())) return
  const id = String(form.get("id") ?? "")
  if (!/^\d+$/.test(id)) return
  await setHandled(id, form.get("handled") === "true")
  revalidatePath("/admin")
}
