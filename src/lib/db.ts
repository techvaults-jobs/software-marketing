import "server-only"
import { Pool } from "pg"

const globalForDb = globalThis as unknown as { enquiryPool?: Pool }

/** True when this deployment has a database to write to. */
export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

/** One small pool per server process, reused across hot reloads in development. */
export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.")
  globalForDb.enquiryPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  })
  return globalForDb.enquiryPool
}
