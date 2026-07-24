import Link from "next/link"
import { FileText } from "lucide-react"

import { ThemeToggle } from "@/components/layout/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-4" />
          </span>
          <span>견적서 시스템</span>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  )
}
