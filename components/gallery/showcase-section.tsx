import type { ReactNode } from "react"

export function ShowcaseSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="font-heading text-sm font-semibold">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
