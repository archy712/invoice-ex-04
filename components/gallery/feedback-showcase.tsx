"use client"

import { toast } from "sonner"

import { ShowcaseSection } from "@/components/gallery/showcase-section"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { InfoIcon } from "lucide-react"

export function FeedbackShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ShowcaseSection title="Alert">
        <Alert className="w-full">
          <InfoIcon />
          <AlertTitle>업데이트 안내</AlertTitle>
          <AlertDescription>새 버전이 배포되었습니다.</AlertDescription>
        </Alert>
      </ShowcaseSection>

      <ShowcaseSection title="Toast (Sonner)">
        <Button
          variant="outline"
          onClick={() =>
            toast.success("저장되었습니다", {
              description: "변경 사항이 정상적으로 반영되었습니다.",
            })
          }
        >
          토스트 표시
        </Button>
      </ShowcaseSection>

      <ShowcaseSection title="Badge">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </ShowcaseSection>

      <ShowcaseSection title="Progress">
        <Progress value={66} className="w-full max-w-56" />
      </ShowcaseSection>

      <ShowcaseSection title="Skeleton">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Spinner">
        <Spinner className="size-5" />
        <Button disabled variant="outline">
          <Spinner />
          불러오는 중...
        </Button>
      </ShowcaseSection>
    </div>
  )
}
