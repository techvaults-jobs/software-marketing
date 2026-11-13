import { Mail, MapPin, Phone } from "lucide-react"
import { site, whatsappLink } from "@/content/site"

/**
 * The contact line above the header that every TechVaults site carries. Left
 * out on phones, where the menu and footer already hold the same details.
 */
export function TopBar() {
  return (
    <div className="hidden bg-ink text-[13px] text-on-dark-muted md:block">
      <div className="frame pad flex h-9 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <MapPin className="size-3.5" aria-hidden />
          {site.address.join(", ")}
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-paper">
              <Phone className="size-3.5" aria-hidden />
              {site.phone.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-paper">
              <Mail className="size-3.5" aria-hidden />
              {site.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
