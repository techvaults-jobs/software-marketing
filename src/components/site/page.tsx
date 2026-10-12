import { ViewTransition, type ReactNode } from "react"

const directions = { "nav-forward": "page-forward", "nav-back": "page-back", default: "page" }

/**
 * Wraps a route's content so navigations animate. Links tagged `nav-forward`
 * or `nav-back` slide sideways; everything else fades and settles. This lives
 * in each page, not the layout: layouts persist, so they never enter or exit.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directions} exit={directions} default="none">
      <main id="main" className="flex-1">
        {children}
      </main>
    </ViewTransition>
  )
}
