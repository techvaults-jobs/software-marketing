"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { Menu } from "lucide-react"
import { nav } from "@/content/site"
import { cn } from "@/lib/utils"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-40 border-b bg-white/85 backdrop-blur-md transition-colors duration-200",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="TechVaults home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center lg:flex" onMouseLeave={() => setHovered(null)}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                isActive(item.href) ? "text-ink" : "text-muted-foreground hover:text-ink"
              )}
            >
              {hovered === item.href ? (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link href="/demo" className="btn btn-sm btn-outline hidden sm:inline-flex">
            Try the demo
          </Link>
          <Link href="/contact" className="btn btn-sm btn-primary">
            Talk to us
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-full border border-[#d9d9d9] transition-colors hover:border-ink lg:hidden"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] gap-0 p-0">
              <SheetHeader className="border-b border-line px-5 py-4">
                <SheetTitle className="text-left text-sm font-medium text-muted-foreground">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-2 py-3">
                {[...nav, { href: "/demo", label: "Try the demo" }, { href: "/contact", label: "Talk to us" }].map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} />}
                    className={cn(
                      "rounded-lg px-3 py-3 text-left text-[17px] font-medium tracking-tight transition-colors hover:bg-secondary",
                      isActive(item.href) && "text-brand"
                    )}
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
