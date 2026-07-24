export type InvoiceStatus = "대기" | "승인" | "거절";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  issueDate: string;
  validUntil: string;
  items: InvoiceItem[];
  totalAmount: number;
  status: InvoiceStatus;
}
