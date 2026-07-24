import { formatCurrency } from "@/lib/dummy-data";
import type { Invoice } from "@/types/invoice";

interface InvoiceSummaryProps {
  invoice: Invoice;
}

export function InvoiceSummary({ invoice }: InvoiceSummaryProps) {
  return (
    <div className="flex justify-end">
      <div className="flex w-full max-w-xs items-center justify-between gap-4 sm:max-w-sm">
        <span className="text-sm font-medium text-muted-foreground">합계금액</span>
        <span className="font-heading text-xl font-semibold">
          {formatCurrency(invoice.totalAmount)}
        </span>
      </div>
    </div>
  );
}
