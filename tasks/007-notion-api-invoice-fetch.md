# Task 007: Notion API 견적서 데이터 조회 구현

**Phase**: Phase 3 — 핵심 기능 구현 (Notion 연동 · PDF)
**관련 기능**: F001(노션 데이터베이스 연동), F002(견적서 조회)
**상태**: ✅ 완료

## 명세

`lib/notion.ts`의 `getInvoice(pageId)`를 실제 Notion API 호출로 구현해, `/invoice/[notionPageId]`가 더미 데이터(Task 004~006) 대신 실제 Notion 데이터를 렌더하도록 교체한다. Invoices 데이터소스에서 `notion.pages.retrieve`로 견적서 페이지를 조회하고, `items` relation을 `notion.dataSources.query`로 한 번에 조회해 도메인 `Invoice` 타입으로 매핑한 뒤 `invoiceSchema`로 검증한다. 존재하지 않는 페이지/Zod 파싱 실패는 별도로 삼키지 않고 그대로 throw해, 이미 존재하는 라우트 `error.tsx` 바운더리가 흡수하도록 한다(404 전용 분기는 Task 008에서 별도 구현).

## 관련 파일

- `lib/notion.ts` (수정) — `getInvoice(pageId)` 실구현, 속성 추출 헬퍼, `ITEMS_DATA_SOURCE_ID` 상수
- `lib/validations.ts` (수정) — `invoiceSchema` 필수 문자열 필드에 `.min(1)` 추가
- `app/(site)/invoice/[notionPageId]/page.tsx` (수정) — `dummyInvoice` 제거, `getInvoice(notionPageId)` 연결, `generateMetadata` 실데이터 연동
- `lib/dummy-data.ts` (참조, 수정 없음) — 더미 데이터 export 자체는 유지(다른 곳에서 참조하지 않음이 확인되면 이후 정리 대상)
- `types/invoice.ts` (참조, 수정 없음) — `getInvoice` 반환 타입 기준

## 수락 기준

- [x] `getInvoice(pageId)`가 실제 Notion 페이지를 조회해 `Invoice` 타입 객체를 반환한다(더미 데이터 미사용).
- [x] Invoices 속성(`invoice_number`/`client_name`/`issue_date`/`valid_until`/`status`/`total_amount`)이 정확히 매핑된다.
- [x] `items` relation이 `notion.dataSources.query`(단일 호출)로 조회되어 `InvoiceItem[]`으로 매핑되고, `amount`는 Notion formula 값을 그대로 사용한다.
- [x] `items`가 빈 배열이어도 정상적으로 `Invoice` 객체가 만들어진다(0개 항목 케이스).
- [x] 매핑 결과가 `invoiceSchema.parse()`로 검증되며, 필수 문자열 필드가 비어 있으면 파싱이 실패한다.
- [x] Notion API 에러(존재하지 않는 페이지 등)와 Zod 파싱 실패가 앱 크래시/500 노출 없이 `error.tsx` 바운더리로 흡수된다.
- [x] `page.tsx`/`generateMetadata`가 `getInvoice`를 호출해 실데이터를 렌더한다.
- [x] `npx tsc --noEmit`, `npm run lint` 통과.
- [x] 아래 테스트 체크리스트 5개 시나리오 모두 Pass.

## 구현 단계

1. Notion MCP로 실제 워크스페이스의 Invoices/Items 데이터소스 스키마 및 표본 데이터 조회(완료 — 계획 단계에서 확인).
2. Context7 MCP로 `@notionhq/client`의 `dataSources.query`(2025-09-03 API) 문법 확인(완료 — 계획 단계에서 확인).
3. `lib/validations.ts`의 `invoiceSchema` 필수 문자열 필드에 `.min(1)` 추가.
4. `lib/notion.ts`에 속성 추출 헬퍼(title/rich_text/date/select/number/relation/formula) 작성.
5. `lib/notion.ts`에 `ITEMS_DATA_SOURCE_ID` 상수 추가(출처 주석 포함) 및 `getInvoice` 본문 구현(`pages.retrieve` → 속성 매핑 → `dataSources.query`로 items 조회 → `invoiceSchema.parse`).
6. `app/(site)/invoice/[notionPageId]/page.tsx`에서 `dummyInvoice` 제거하고 `getInvoice(notionPageId)` 연결, `generateMetadata`도 실데이터 기반으로 교체(try/catch 폴백 유지).
7. `npx tsc --noEmit`, `npm run lint`로 정적 검증.
8. Notion MCP로 테스트 픽스처 2건 생성(품목 0개, 필수 속성 누락).
9. `npm run dev` 기동 후 Playwright MCP로 아래 5개 시나리오 실행, 결과를 본 파일에 기록.
10. 모든 시나리오 Pass 후 수락 기준/체크리스트 갱신, `ROADMAP.md`의 Task 007 항목을 ✅로 갱신.

## 테스트 체크리스트 (Playwright MCP)

- [x] 정상: 유효한 `notionPageId`(`3a726a4c-46b7-80c7-8544-f683e38a02bd`) 접근 시 견적서 번호·클라이언트·발행일·항목·총액이 Notion 원본(`INVOICE-2026-001`, ABC 회사, 총액 3,000,000원)과 일치하게 렌더되는지 검증 — Pass. 페이지 타이틀 "견적서 INVOICE-2026-001 · ABC 회사", 발행일 2026-07-24, 유효기간 2026-07-31, 합계 ₩3,000,000 확인. 콘솔 에러 없음.
- [x] 정상: 항목(Items) Relation이 정확히 조회되어 수량 × 단가 및 총액 계산이 원본과 일치하는지 검증(웹사이트 디자인 1×1,000,000 / 포트폴리오 제작 20×50,000 / 명함제작 100×10,000, 합계 3,000,000원) — Pass. 3개 항목 모두 수량·단가·금액 일치.
- [x] 에러: 존재하지 않는 `notionPageId`(`00000000-0000-0000-0000-000000000000`)에서 Notion API 에러가 앱 크래시 없이 처리되는지 검증 — Pass. `notion.pages.retrieve`가 `APIResponseError(object_not_found)`를 throw하고 `error.tsx` 바운더리가 "견적서를 불러오는 중 문제가 발생했습니다" 화면으로 흡수. 500 미노출.
- [x] 엣지: 필수 속성 누락(픽스처 `INVOICE-2026-000-NODATE`, `issue_date` 미설정) 시 Zod 파싱 실패가 안전하게 폴백되고 500이 노출되지 않는지 검증 — Pass. `extractDate`가 "Notion 필수 날짜 속성이 비어 있습니다: issue_date"를 throw하고 동일한 `error.tsx` 바운더리로 흡수.
- [x] 엣지: 항목이 0개인 견적서(픽스처 `INVOICE-2026-000-EMPTY`)에서 빈 테이블/총액 0원이 정상 렌더되는지 검증 — Pass. 테이블 헤더만 렌더되고 본문 행 0개, 합계금액 ₩0 정상 표시.

## 변경 사항 요약

- `lib/notion.ts`: `getInvoice(pageId)`를 더미 데이터에서 실제 Notion API(`pages.retrieve` + `dataSources.query`) 기반으로 전환. title/rich_text/date/select/number/relation/formula 속성 추출 헬퍼 추가, `ITEMS_DATA_SOURCE_ID` 상수 추가.
- `lib/validations.ts`: `invoiceSchema`의 필수 문자열 필드(`invoiceNumber`/`clientName`/`issueDate`/`validUntil`)에 `.min(1)` 추가.
- `app/(site)/invoice/[notionPageId]/page.tsx`: `dummyInvoice` 제거, `getInvoice(notionPageId)` 연결. `generateMetadata`도 실데이터 기반으로 전환(조회 실패 시 폴백 title 유지).
- 정적 검증(`tsc --noEmit`, `lint`) 통과, Playwright MCP로 정상/에러/엣지 5개 시나리오 모두 Pass 확인(로컬 `npm run dev` 기동 후 실행, 테스트 후 서버 종료).
