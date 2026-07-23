import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
        <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          지금 바로 컴포넌트를 확인해보세요
        </h2>
        <p className="max-w-xl text-balance text-primary-foreground/80">
          컴포넌트 쇼케이스, 폼 예제, 대시보드, 테이블/리스트 예제까지 —
          바로 복사해서 사용할 수 있습니다.
        </p>
        <Button
          size="lg"
          variant="secondary"
          nativeButton={false}
          render={
            <Link href="/gallery">
              갤러리로 이동
              <ArrowRight className="size-4" />
            </Link>
          }
        />
      </div>
    </section>
  )
}
