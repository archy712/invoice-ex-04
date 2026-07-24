# Task 002: 견적서 도메인 타입 및 검증 스키마 정의

**Phase**: Phase 1 — 애플리케이션 골격 및 데이터 계층 설계
**관련 기능**: F001(노션 데이터베이스 연동)의 데이터 모델
**상태**: ✅ 완료

## 명세

PRD 데이터 모델(F001)을 기준으로 견적서 도메인 타입과 이를 검증하는 Zod 스키마를 정의한다. Notion 원본 응답 → 도메인 타입 매핑은 실제 Notion 응답을 아직 본 적이 없으므로 이번 단계 범위에서 제외하고, Phase 3(Task 007)에서 실제 응답 구조를 확인한 뒤 설계한다.

## 관련 파일

- `types/invoice.ts` (신규) — `Invoice`, `InvoiceItem`, `InvoiceStatus` 도메인 타입
- `lib/validations.ts` (수정) — `invoiceSchema`, `invoiceItemSchema` (zod) 추가
- `docs/PRD.md` — 데이터 모델(F001) 필드 정의 참조

## 수락 기준

- [x] `types/invoice.ts`에 `Invoice`, `InvoiceItem` 인터페이스와 `InvoiceStatus`(`"대기" | "승인" | "거절"`) 유니온 타입 정의.
- [x] `lib/validations.ts`에 `invoiceItemSchema`, `invoiceSchema`(zod)를 기존 컨벤션 주석 아래에 추가.
- [x] 두 파일의 필드가 이름/타입 기준으로 정확히 1:1 대응 (`id`, `invoiceNumber`, `clientName`, `issueDate`, `validUntil`, `items`, `totalAmount`, `status` / `id`, `description`, `quantity`, `unitPrice`, `amount`).
- [x] `status`는 정확히 3개 값만 허용 (인터페이스는 유니온, 스키마는 `z.enum`).
- [x] `npx tsc --noEmit`, `npm run lint` 통과.

## 구현 단계

1. `types/` 디렉터리 생성 후 `types/invoice.ts` 작성.
2. `lib/validations.ts`에 `import { z } from "zod"` 및 `invoiceItemSchema`, `invoiceSchema` 추가 (기존 안내 주석은 유지).
3. 두 파일을 나란히 대조해 필드명/타입 불일치 여부 확인.
4. `npx tsc --noEmit`, `npm run lint` 실행해 통과 확인.

## 변경 사항 요약

- `issueDate`/`validUntil`은 우선 ISO 문자열(`string`)로 정의 — Notion 응답을 실제로 확인하기 전까지 `Date` 객체 변환 여부는 미정 (Task 004/007에서 확정).
- Notion 원본 속성(raw property) 타입은 이번 Task에서 만들지 않음 — 실제 응답 구조를 추측해서 만들지 않기 위함(shrimp-rules.md 추측 금지 원칙). Task 007에서 실응답 확인 후 매핑 함수/타입을 추가할 예정.
- `invoiceSchema`/`invoiceItemSchema`는 이 프로젝트 최초의 zod 스키마 사례이므로, `Schema` 접미사 + camelCase 네이밍이 향후 스키마의 기준 컨벤션이 됨.
