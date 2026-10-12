"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Turns on scroll reveals. Until this runs, every `.reveal` element is plainly
 * visible, so the page reads the same without JavaScript. Once it runs,
 * elements below the fold wait, then ease in the first time they are scrolled to.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const root = document.documentElement
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-in")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)")
    for (const target of targets) {
      // Anything already on screen stays put: only content yet to be seen animates.
      if (target.getBoundingClientRect().top < window.innerHeight) target.classList.add("is-in")
      else observer.observe(target)
    }
    // Hide what is waiting in one step. Without this the first paint would
    // show below-the-fold content fading out before it ever fades in.
    root.classList.add("reveal-snap")
    root.dataset.reveal = "on"
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("reveal-snap")))
    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove("reveal-snap")
      observer.disconnect()
    }
  }, [pathname])

  return null
}
