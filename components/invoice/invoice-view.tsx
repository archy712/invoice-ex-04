import { Download } from "lucide-react";

import { InvoiceClientInfo } from "@/components/invoice/invoice-client-info";
import { InvoiceHeader } from "@/components/invoice/invoice-header";
import { InvoiceItemsTable } from "@/components/invoice/invoice-items-table";
import { InvoiceSummary } from "@/components/invoice/invoice-summary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "@/types/invoice";

interface InvoiceViewProps {
  invoice: Invoice;
}

// 견적서 조회 페이지 최상위 뷰어 — 하위 프레젠테이션 컴포넌트를 Card로 조합한다.
export function InvoiceView({ invoice }: InvoiceViewProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-10 sm:px-6 sm:py-16">
      {/* 상단 액션 바 — PDF 다운로드 버튼 자리(F003). 동작은 Phase 3/Task 010에서 연결 */}
      <div className="flex items-center justify-end">
        {/* disabled 버튼이라 클릭 핸들러가 필요 없음 — 서버 컴포넌트에서 클라이언트 컴포넌트로
            함수 prop을 전달할 수 없어(RSC 직렬화 제약) placeholder onClick도 넣지 않는다. */}
        <Button variant="outline" disabled>
          <Download />
          PDF 다운로드
        </Button>
        {/* TODO(Phase 3/Task 010): @react-pdf/renderer 기반 PDF 생성 및 다운로드 로직 연결 */}
      </div>

      <Card className="shadow-sm">
        <CardContent className="flex flex-col gap-6">
          <InvoiceHeader invoice={invoice} />
          <Separator />
          <InvoiceClientInfo invoice={invoice} />
          <Separator />
          <InvoiceItemsTable invoice={invoice} />
          <Separator />
          <InvoiceSummary invoice={invoice} />
        </CardContent>
      </Card>
    </div>
  );
}
