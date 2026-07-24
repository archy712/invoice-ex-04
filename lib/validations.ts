// 이 파일은 react-hook-form + zod 검증 스키마를 위한 공용 위치입니다.
// 향후 견적서 관련 폼(있는 경우)의 zod 스키마를 여기에 정의하세요.
//
// 예시:
// import { z } from "zod"
//
// export const exampleSchema = z.object({
//   name: z.string().min(1),
// })

import { z } from "zod";

// Notion API 응답을 파싱/검증하는 스키마 (types/invoice.ts의 도메인 타입과 필드 1:1 대응).
// lib/notion.ts의 getInvoice가 Notion 페이지 속성을 이 스키마 형태로 매핑한 뒤 검증한다.
export const invoiceItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  amount: z.number(),
});

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string().min(1),
  clientName: z.string().min(1),
  issueDate: z.string().min(1),
  validUntil: z.string().min(1),
  items: z.array(invoiceItemSchema),
  totalAmount: z.number(),
  status: z.enum(["대기", "승인", "거절"]),
});
