import type { Metadata } from "next"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { UserTable } from "@/components/examples/user-table"

export const metadata: Metadata = {
  title: "테이블/리스트 예제",
  description: "Table 뷰와 Card List 뷰를 전환할 수 있는 예제",
}

export default function TableExamplePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gallery">갤러리</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>테이블/리스트 예제</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          테이블/리스트 예제
        </h1>
        <p className="mt-2 text-muted-foreground">
          동일한 데이터를 Table 뷰와 Card List 뷰로 전환하며 확인할 수 있습니다.
        </p>
      </div>

      <UserTable />
    </div>
  )
}
