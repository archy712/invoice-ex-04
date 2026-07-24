export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} 견적서 시스템. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
