import { format } from "date-fns";
import { ko } from "date-fns/locale";

import type { Invoice, InvoiceItem } from "@/types/invoice";

// Phase 2(Task 004) 더미 데이터 — Phase 3(Task 007)에서 Notion 실데이터로 교체됩니다.

function calculateItemAmount(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}

function calculateTotalAmount(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

const dummyItems: InvoiceItem[] = [
  {
    id: "item-1",
    description: "브랜드 아이덴티티 디자인",
    quantity: 1,
    unitPrice: 1500000,
    amount: calculateItemAmount(1, 1500000),
  },
  {
    id: "item-2",
    description: "반응형 웹사이트 개발 (5페이지)",
    quantity: 1,
    unitPrice: 3200000,
    amount: calculateItemAmount(1, 3200000),
  },
  {
    id: "item-3",
    description: "콘텐츠 관리 시스템(CMS) 연동",
    quantity: 1,
    unitPrice: 800000,
    amount: calculateItemAmount(1, 800000),
  },
  {
    id: "item-4",
    description: "유지보수 (월 단위)",
    quantity: 3,
    unitPrice: 200000,
    amount: calculateItemAmount(3, 200000),
  },
];

export const dummyInvoice: Invoice = {
  id: "dummy-invoice-001",
  invoiceNumber: "QT-2026-0042",
  clientName: "주식회사 노션스튜디오",
  issueDate: "2026-07-01",
  validUntil: "2026-07-31",
  items: dummyItems,
  totalAmount: calculateTotalAmount(dummyItems),
  status: "대기",
};

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "yyyy년 M월 d일", { locale: ko });
}
