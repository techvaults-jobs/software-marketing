import Link from "next/link"
import { Page } from "@/components/site/page"

export default function NotFound() {
  return (
    <Page>
      <div className="frame">
        <div className="pad flex min-h-[60vh] flex-col items-start justify-center py-20">
          <p className="eyebrow mb-4">404</p>
          <h1 className="title">That page is not in stock.</h1>
          <p className="lede mt-4 max-w-[48ch]">The link may be old, or the page may have moved.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/demo" className="btn btn-outline">
              Try the demo
            </Link>
          </div>
        </div>
      </div>
    </Page>
  )
}
