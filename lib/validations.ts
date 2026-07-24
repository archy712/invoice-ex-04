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
// Notion 원본 속성 → 이 스키마로의 매핑은 Phase 3(Task 007)에서 실제 응답을 확인한 뒤 구현한다.
export const invoiceItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  amount: z.number(),
});

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  clientName: z.string(),
  issueDate: z.string(),
  validUntil: z.string(),
  items: z.array(invoiceItemSchema),
  totalAmount: z.number(),
  status: z.enum(["대기", "승인", "거절"]),
});
