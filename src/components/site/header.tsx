"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { appLink, moreNav, nav } from "@/content/site"
import { cn } from "@/lib/utils"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const signIn = appLink("/login")
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header style={{ viewTransitionName: "site-header" }} className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="frame pad flex h-16 items-center gap-6">
        <Link href="/" aria-label="StockVaults by TechVaults, home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm whitespace-nowrap transition-colors",
                isActive(item.href) ? "text-ink" : "text-steel hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          {signIn ? (
            <a href={signIn} className="hidden px-1 text-sm whitespace-nowrap text-ink transition-colors hover:text-vault-red sm:inline">
              Sign in
            </a>
          ) : null}
          <Link href="/demo" className="btn btn-sm btn-primary">
            Try the demo
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-11 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-ink lg:hidden"
            >
              <Menu className="size-4" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] gap-0 p-0">
              <SheetHeader className="border-b border-line px-5 py-4">
                <SheetTitle className="text-left text-sm font-medium text-steel">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-2 py-3">
                {[...nav, ...moreNav, ...(signIn ? [{ href: signIn, label: "Sign in" }] : [])].map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} />}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-left text-[17px] font-medium tracking-tight transition-colors hover:bg-secondary",
                      isActive(item.href) && "text-vault-red"
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
