import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, LayoutDashboard, Rows3, SquareStack } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InputsShowcase } from "@/components/gallery/inputs-showcase"
import { NavigationShowcase } from "@/components/gallery/navigation-showcase"
import { FeedbackShowcase } from "@/components/gallery/feedback-showcase"
import { OverlayShowcase } from "@/components/gallery/overlay-showcase"
import { DataDisplayShowcase } from "@/components/gallery/data-display-showcase"
import { HooksShowcase } from "@/components/gallery/hooks-showcase"

export const metadata: Metadata = {
  title: "컴포넌트 갤러리",
  description: "스타터킷에 포함된 모든 컴포넌트 쇼케이스",
}

const exampleLinks = [
  {
    href: "/gallery/form",
    icon: Rows3,
    title: "폼 예제",
    description: "react-hook-form + zod 검증 예제",
  },
  {
    href: "/gallery/table",
    icon: SquareStack,
    title: "테이블/리스트 예제",
    description: "Table 뷰 / Card List 뷰 전환",
  },
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    title: "대시보드 예제",
    description: "Sidebar 레이아웃과 차트",
  },
]

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          컴포넌트 갤러리
        </h1>
        <p className="mt-2 text-muted-foreground">
          이 스타터킷에 포함된 모든 컴포넌트를 카테고리별로 확인하세요.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {exampleLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4.5" />
                </div>
                <CardTitle className="flex items-center gap-1.5">
                  {item.title}
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>

      <Tabs defaultValue="inputs">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="inputs">기초 입력</TabsTrigger>
          <TabsTrigger value="navigation">네비게이션</TabsTrigger>
          <TabsTrigger value="feedback">피드백</TabsTrigger>
          <TabsTrigger value="overlay">오버레이</TabsTrigger>
          <TabsTrigger value="data">데이터 표시</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs">
          <InputsShowcase />
        </TabsContent>
        <TabsContent value="navigation">
          <NavigationShowcase />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackShowcase />
        </TabsContent>
        <TabsContent value="overlay">
          <OverlayShowcase />
        </TabsContent>
        <TabsContent value="data">
          <DataDisplayShowcase />
        </TabsContent>
        <TabsContent value="hooks">
          <HooksShowcase />
        </TabsContent>
      </Tabs>
    </div>
  )
}
