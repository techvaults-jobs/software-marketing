import "server-only"
import { db } from "@/lib/db"

export type NewEnquiry = { name: string; email: string; company: string; sector: string; message: string }

export type Enquiry = NewEnquiry & { id: string; createdAt: Date; handledAt: Date | null }

type Row = { id: string; created_at: Date; handled_at: Date | null; name: string; email: string; company: string; sector: string; message: string }

const toEnquiry = (row: Row): Enquiry => ({
  id: row.id,
  createdAt: row.created_at,
  handledAt: row.handled_at,
  name: row.name,
  email: row.email,
  company: row.company,
  sector: row.sector,
  message: row.message,
})

export async function saveEnquiry(enquiry: NewEnquiry) {
  await db().query("INSERT INTO enquiries (name, email, company, sector, message) VALUES ($1, $2, $3, $4, $5)", [
    enquiry.name,
    enquiry.email,
    enquiry.company,
    enquiry.sector,
    enquiry.message,
  ])
}

/** Newest first, open ones before handled ones. */
export async function listEnquiries(limit = 200): Promise<Enquiry[]> {
  const result = await db().query<Row>(
    "SELECT id, created_at, handled_at, name, email, company, sector, message FROM enquiries ORDER BY handled_at IS NOT NULL, created_at DESC LIMIT $1",
    [limit]
  )
  return result.rows.map(toEnquiry)
}

export async function setHandled(id: string, handled: boolean) {
  await db().query("UPDATE enquiries SET handled_at = CASE WHEN $2 THEN now() ELSE NULL END WHERE id = $1", [id, handled])
}
