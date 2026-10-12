/**
 * Applies the SQL files in db/migrations that this database has not seen yet,
 * in name order, each inside its own transaction. Runs before the server
 * starts, so a deploy never serves code that is ahead of its tables.
 *
 * Without DATABASE_URL it does nothing: the site still runs, and the contact
 * form falls back to email.
 */
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import pg from "pg"

const directory = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "db", "migrations")

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.log("migrate: DATABASE_URL is not set, nothing to do.")
    return
  }
  const client = new pg.Client({ connectionString: url })
  await client.connect()
  try {
    // One deploy at a time: a second instance starting up waits here.
    await client.query("SELECT pg_advisory_lock(4127001)")
    await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())")
    const applied = new Set((await client.query("SELECT name FROM schema_migrations")).rows.map((row) => row.name))
    const files = (await readdir(directory)).filter((name) => name.endsWith(".sql")).sort()
    for (const name of files) {
      if (applied.has(name)) continue
      const sql = await readFile(path.join(directory, name), "utf8")
      await client.query("BEGIN")
      try {
        await client.query(sql)
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name])
        await client.query("COMMIT")
        console.log(`migrate: applied ${name}`)
      } catch (error) {
        await client.query("ROLLBACK")
        throw new Error(`migrate: ${name} failed and was rolled back. ${error instanceof Error ? error.message : error}`)
      }
    }
    console.log("migrate: database is up to date.")
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
