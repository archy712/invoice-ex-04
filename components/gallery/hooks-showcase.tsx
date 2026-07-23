"use client"

import { ShowcaseSection } from "@/components/gallery/showcase-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBreakpoint } from "@/hooks/use-media-query"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function HooksShowcase() {
  const isDesktop = useBreakpoint("md")
  const [count, setCount] = useLocalStorage("gallery-counter", 0)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ShowcaseSection
        title="useMediaQuery"
        description="react-responsive 기반, 화면 크기를 실시간으로 감지합니다"
      >
        <p className="text-sm text-muted-foreground">
          현재 화면은{" "}
          <Badge variant={isDesktop ? "default" : "secondary"}>
            {isDesktop ? "md 이상 (데스크톱)" : "md 미만 (모바일)"}
          </Badge>{" "}
          입니다.
        </p>
      </ShowcaseSection>

      <ShowcaseSection
        title="useLocalStorage"
        description="use-local-storage-state 기반, 새로고침해도 값이 유지됩니다"
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => setCount((c) => c - 1)}>
            -
          </Button>
          <span className="w-10 text-center text-lg font-medium tabular-nums">
            {count}
          </span>
          <Button variant="outline" size="icon" onClick={() => setCount((c) => c + 1)}>
            +
          </Button>
        </div>
      </ShowcaseSection>
    </div>
  )
}
