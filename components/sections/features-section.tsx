import {
  Blocks,
  Moon,
  Paintbrush,
  Sparkles,
  SquareCode,
  Zap,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Next.js 16 App Router",
    description: "Turbopack 기본 적용, 최신 라우팅 컨벤션을 반영한 프로젝트 구조.",
  },
  {
    icon: SquareCode,
    title: "TypeScript",
    description: "엄격한 타입 체크와 PageProps/LayoutProps 헬퍼로 안전한 개발.",
  },
  {
    icon: Paintbrush,
    title: "Tailwind CSS v4",
    description: "CSS-first 설정과 OKLCH 기반 디자인 토큰으로 빠른 스타일링.",
  },
  {
    icon: Blocks,
    title: "shadcn/ui · Base UI",
    description: "40개 이상의 접근성 높은 컴포넌트를 그대로 복사해 사용.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "next-themes 기반 시스템 테마 감지와 깜빡임 없는 전환.",
  },
  {
    icon: Sparkles,
    title: "커스텀 훅",
    description: "useMediaQuery, useLocalStorage 등 검증된 라이브러리 기반 훅 제공.",
  },
]

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          이 스타터킷에 포함된 것들
        </h2>
        <p className="mt-3 text-muted-foreground">
          바퀴를 재발명하지 않고, 검증된 도구로 구성했습니다.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-4.5" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
