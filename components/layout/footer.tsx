import Link from "next/link"
import { Rocket } from "lucide-react"

import { GitHubIcon, XIcon } from "@/components/icons"

const linkGroups = [
  {
    title: "제품",
    links: [
      { href: "/", label: "홈" },
      { href: "/gallery", label: "컴포넌트 갤러리" },
      { href: "/dashboard", label: "대시보드" },
    ],
  },
  {
    title: "예제",
    links: [
      { href: "/gallery/form", label: "폼 예제" },
      { href: "/gallery/table", label: "테이블/리스트 예제" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-2 font-heading text-sm font-semibold">
            <Rocket className="size-5 text-primary" />
            <span>Starter Kit</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Next.js, TypeScript, TailwindCSS, shadcn/ui로 구성된 모던 웹 개발 스타터킷입니다.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Link
              href="https://github.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-4" />
            </Link>
            <Link
              href="https://twitter.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <XIcon className="size-4" />
            </Link>
          </div>
        </div>

        {linkGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Starter Kit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
