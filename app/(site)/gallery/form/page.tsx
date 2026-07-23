import type { Metadata } from "next"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ContactForm } from "@/components/examples/contact-form"

export const metadata: Metadata = {
  title: "폼 예제",
  description: "react-hook-form과 zod를 사용한 폼 검증 예제",
}

export default function FormExamplePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gallery">갤러리</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>폼 예제</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">폼 예제</h1>
        <p className="mt-2 text-muted-foreground">
          react-hook-form과 zod로 검증되는 문의 폼입니다.
        </p>
      </div>

      <ContactForm />
    </div>
  )
}
