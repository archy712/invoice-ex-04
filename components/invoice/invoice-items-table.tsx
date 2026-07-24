import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/dummy-data";
import type { Invoice } from "@/types/invoice";

interface InvoiceItemsTableProps {
  invoice: Invoice;
}

export function InvoiceItemsTable({ invoice }: InvoiceItemsTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">견적 항목</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>설명</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">단가</TableHead>
            <TableHead className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoice.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="whitespace-normal font-medium">
                {item.description}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {item.quantity.toLocaleString("ko-KR")}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatCurrency(item.unitPrice)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
