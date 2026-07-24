import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// 실제 견적서 뷰어(components/invoice/invoice-view.tsx)와 동일한 구조의 스켈레톤 —
// 헤더 / 발행자·클라이언트 정보 / 항목 테이블 / 총액 요약 순서를 그대로 반영한다.
export default function InvoiceLoading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-10 sm:px-6 sm:py-16">
      {/* 상단 액션 바(PDF 다운로드 버튼) 자리 */}
      <div className="flex items-center justify-end">
        <Skeleton className="h-8 w-32" />
      </div>

      <Card>
        <CardContent className="flex flex-col gap-6">
          {/* 견적서 번호 + 상태 뱃지 + 발행일/유효기간 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-7 w-40" />
              </div>
              <Skeleton className="h-5 w-14 rounded-4xl" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:max-w-xs">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>

          <Separator />

          {/* 발행자 / 공급받는자 정보 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Separator />

          {/* 견적 항목 테이블 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>

          <Separator />

          {/* 합계금액 요약 */}
          <div className="flex justify-end">
            <Skeleton className="h-7 w-40" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
