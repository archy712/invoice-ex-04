import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitHubIcon } from "@/components/icons"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--color-primary)/8%,transparent_60%)]" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          Next.js 16 · React 19 · Tailwind v4
        </Badge>

        <h1 className="max-w-3xl text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          빠르게 시작하는 모던 웹 스타터킷
        </h1>

        <p className="max-w-xl text-balance text-lg text-muted-foreground">
          shadcn/ui와 Base UI로 만들어진 재사용 가능한 컴포넌트, 레이아웃, 예제 페이지로
          다음 프로젝트를 바로 시작하세요.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            nativeButton={false}
            render={
              <Link href="/gallery">
                컴포넌트 둘러보기
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <Button
            size="lg"
            nativeButton={false}
            variant="outline"
            render={
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <GitHubIcon className="size-4" />
                GitHub
              </Link>
            }
          />
        </div>
      </div>
    </section>
  )
}
