import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceStatus } from "@/types/invoice";

interface InvoiceHeaderProps {
  invoice: Invoice;
}

// 상태값별 뱃지 스타일 매핑 — 대기(중립)/승인(긍정)/거절(파괴적) 색상으로 구분
const statusBadgeConfig: Record<
  InvoiceStatus,
  { variant: "secondary" | "outline" | "destructive"; className?: string }
> = {
  대기: { variant: "secondary" },
  승인: {
    variant: "outline",
    className:
      "border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:text-emerald-400",
  },
  거절: { variant: "destructive" },
};

export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  const statusConfig = statusBadgeConfig[invoice.status];

  return (
    <div className="flex flex-col gap-4">
      {/* 견적서 번호 + 상태 뱃지 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">견적서</p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {invoice.invoiceNumber}
          </h1>
        </div>
        <Badge variant={statusConfig.variant} className={cn(statusConfig.className)}>
          {invoice.status}
        </Badge>
      </div>

      {/* 발행일 / 유효기간 */}
      <dl className="grid grid-cols-2 gap-4 text-sm sm:max-w-xs">
        <div>
          <dt className="text-muted-foreground">발행일</dt>
          <dd className="mt-1 font-medium">{formatDate(invoice.issueDate)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">유효기간</dt>
          <dd className="mt-1 font-medium">{formatDate(invoice.validUntil)}</dd>
        </div>
      </dl>
    </div>
  );
}
