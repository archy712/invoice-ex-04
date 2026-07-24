# Task 008: 견적서 유효성 검증 및 404 처리 구현 (F011)

**Phase**: Phase 3 — 핵심 기능 구현 (Notion 연동 · PDF)
**관련 기능**: F011(존재하지 않는 견적서에 대한 404 유효성 검증)
**상태**: ✅ 완료

## 명세

Task 007에서는 Notion 조회 실패(존재하지 않는 페이지 등)와 Zod 파싱 실패를 구분하지 않고 모두 `error.tsx` 바운더리로 흡수하도록 임시 처리했다("404 전용 분기는 Task 008에서 별도 구현"). 이번 작업에서는 **"존재하지 않음/공유 안 됨"** 케이스와 **"형식 자체가 잘못된 ID"** 케이스를 `notFound()`로 분기해 이미 구현된 루트 `app/not-found.tsx`(F011 문구)가 렌더되도록 한다. 반대로 API 키 오류·rate limit·타임아웃 등 **진짜 일시적/설정성 에러**와 **Zod 파싱 실패**는 Task 007의 동작(=`error.tsx` 흡수)을 그대로 유지한다. 이 두 에러 계열을 명확히 구분하는 것이 이번 작업의 핵심이다.

## 설계 근거 (계획 단계 조사 결과)

- **`notFound()` 동작** (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/not-found.md`): route segment 어디서든(렌더링 중 호출되는 하위 함수 포함) 호출 가능하며 `NEXT_HTTP_ERROR_FALLBACK;404`를 throw해 렌더링을 중단한다. 세그먼트 전용 `not-found.tsx`가 없으면 루트 `app/not-found.tsx`로 폴백된다 — 확인 결과 이미 F011 문구로 구현되어 있어 **새 파일 불필요**.
- **`@notionhq/client` 에러 타입** (`node_modules/@notionhq/client/build/src/errors.d.ts` 직접 확인): `APIResponseError.isAPIResponseError(error)` 타입가드 + `.code`(`APIErrorCode` enum) 제공.
  - `ObjectNotFound`("존재하지 않음") / `RestrictedResource`(통합에 공유되지 않은 리소스) → **`notFound()` 대상**. Notion은 보안상 "존재하지 않음"과 "권한 없음"을 의도적으로 구분하지 않고 대부분 `object_not_found`로 응답하므로, 별도의 "삭제된 페이지" 픽스처를 억지로 만들지 않고 이 두 코드만 잡아도 두 케이스를 모두 커버한다.
  - `Unauthorized`(API 키 자체가 잘못됨) → **제외, `error.tsx` 유지**. 개별 견적서 문제가 아니라 앱 설정 오류이므로 404로 감추면 오히려 디버깅이 어려워진다.
  - `RateLimited`/`InternalServerError`/`ServiceOverload`/`ServiceUnavailable`/`GatewayTimeout`/`ConflictError`/`InvalidJSON` 등 → 일시적 인프라 문제, **`error.tsx` 유지**("다시 시도" UX가 적합).
- **형식 자체가 잘못된 ID**(빈 문자열·비정상 길이·특수문자)는 Notion API 응답 코드에 의존하지 않고 `getInvoice` 진입 시 자체 정규식으로 선제 차단한다 — malformed 값에 대해 Notion이 항상 깔끔한 JSON `validation_error`를 반환한다고 보장할 수 없고, 불필요한 API 호출도 방지된다.

## 관련 파일

- `lib/notion.ts` (수정) — `InvoiceNotFoundError` 클래스 추가, `isValidNotionPageIdFormat(pageId)` 정규식 검증 헬퍼 추가, `getInvoice` 시작부에 형식 검증 추가, `notion.pages.retrieve` 호출을 try/catch로 감싸 `ObjectNotFound`/`RestrictedResource`만 `InvoiceNotFoundError`로 변환(그 외 rethrow)
- `app/(site)/invoice/[notionPageId]/page.tsx` (수정) — `getInvoice` 호출을 try/catch로 감싸 `error instanceof InvoiceNotFoundError`면 `notFound()` 호출, 그 외는 기존처럼 그대로 rethrow해 `error.tsx`가 흡수하도록 유지
- `app/not-found.tsx` (참조, 수정 없음) — 이미 F011 문구 구현됨. 라우트 세그먼트 전용 `not-found.tsx` 없이 이 루트 파일로 정상 폴백되는지 테스트로 재확인만 수행
- `app/(site)/invoice/[notionPageId]/error.tsx` (참조, 수정 없음) — `InvoiceNotFoundError` 이외 에러(설정 오류, Zod 파싱 실패 등)는 계속 이 바운더리로 흡수됨을 회귀 테스트로 확인
- `page.tsx`의 `generateMetadata` (참조, 수정 없음) — 이미 try/catch 폴백 title을 갖고 있어 `notFound()` 도입과 무관하게 동작함을 구현 단계에서 재확인만 수행

## 수락 기준

- [x] 형식은 올바르나(UUID 형태) 존재하지 않거나 통합에 공유되지 않은 `notionPageId` 접근 시 `notFound()`가 호출되어 루트 `app/not-found.tsx`(F011 문구)가 렌더된다.
- [x] 형식 자체가 잘못된 `notionPageId`(빈 문자열·비정상 길이·특수문자)는 Notion API 호출 전에 자체 검증으로 걸러져 동일하게 404 처리된다.
- [x] Notion API 키 오류(Unauthorized) 등 앱 설정성 에러는 404가 아닌 `error.tsx` 바운더리로 계속 흡수된다(Task 007 동작 유지, 회귀 없음).
- [x] Zod 파싱 실패(필수 속성 누락 등)는 404가 아닌 `error.tsx` 바운더리로 계속 흡수된다(Task 007 동작 유지, 회귀 없음).
- [x] 유효한 `notionPageId` 접근 시 기존처럼 견적서 뷰어가 정상 렌더된다(회귀 없음).
- [x] `npx tsc --noEmit`, `npm run lint` 통과.
- [x] 아래 테스트 체크리스트 5개 시나리오 모두 Pass.

## 구현 단계

1. (완료 — 계획 단계) Next.js 16 `notFound()`/`not-found.js` 동작과 `@notionhq/client`의 `APIResponseError`/`APIErrorCode` 확인.
2. `lib/notion.ts`에 `export class InvoiceNotFoundError extends Error` 추가.
3. `lib/notion.ts`에 `isValidNotionPageIdFormat(pageId: string): boolean` 추가 — Notion 페이지 ID 형식(32자리 16진수, 하이픈 유무 무관) 정규식 `/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i` 검증.
4. `getInvoice` 시작부에 형식 검증 추가: 실패 시 `notion.pages.retrieve` 호출 없이 즉시 `InvoiceNotFoundError` throw.
5. `notion.pages.retrieve` 호출부를 try/catch로 감싸고, `APIResponseError.isAPIResponseError(error)`이면서 `error.code`가 `ObjectNotFound` 또는 `RestrictedResource`면 `InvoiceNotFoundError` throw, 그 외는 그대로 rethrow.
6. `app/(site)/invoice/[notionPageId]/page.tsx`에서 `getInvoice` 호출을 try/catch로 감싸 `error instanceof InvoiceNotFoundError`면 `notFound()` 호출, 그 외는 그대로 rethrow(기존 동작 유지).
7. `npx tsc --noEmit`, `npm run lint`로 정적 검증.
8. `npm run dev` 기동 후 Playwright MCP로 아래 5개 시나리오 실행, 결과를 본 파일에 기록.
9. 모든 시나리오 Pass 후 수락 기준/체크리스트 갱신, `docs/ROADMAP.md`의 Task 008 항목과 MVP 성공 기준 #5를 ✅로 갱신.

## 테스트 체크리스트 (Playwright MCP)

- [x] 정상: 유효한 `notionPageId`(`3a726a4c-46b7-80c7-8544-f683e38a02bd`) 접근 시 404가 아닌 견적서 뷰어가 정상 렌더되는지 검증(Task 007 회귀 확인) — Pass. 페이지 타이틀 "견적서 INVOICE-2026-001 · ABC 회사" 정상 렌더, 콘솔 에러 없음.
- [x] 에러(핵심 회귀 지점): 형식은 올바르나 존재하지 않는 `notionPageId`(`00000000-0000-0000-0000-000000000000`)에서 `notFound()`가 호출되어 루트 404 페이지("견적서를 찾을 수 없습니다" + 발행자 문의 안내)가 표시되는지 검증 — Pass. Task 007에서 `error.tsx`였던 것이 이번엔 루트 `app/not-found.tsx`로 정확히 바뀜. 콘솔 에러 0건(경고만 2건, SDK 내부 로그).
- [x] 엣지: 형식 자체가 잘못된 ID 2건(`/invoice/abc`, `/invoice/this-is-not-a-valid-uuid-1234567890`)에서 Notion API 호출 없이 404로 안전하게 폴백되는지 검증 — Pass. 두 URL 모두 즉시 404 페이지 렌더, 콘솔 에러/경고 없음(API 호출 자체가 발생하지 않음을 확인).
- [x] 회귀: `NOTION_API_KEY=invalid_key_for_testing`로 오버라이드해 실행한 dev 서버(`.env.local` 파일은 수정하지 않음, 셸 환경변수가 우선 적용됨을 확인)에서 유효한 `notionPageId` 접근 시 404가 아닌 기존 `error.tsx`("견적서를 불러오는 중 문제가 발생했습니다")로 흡수되는지 검증 — Pass. 콘솔에서 `APIResponseError: API token is invalid.`(`code: unauthorized`)가 `NOT_FOUND_ERROR_CODES`에 포함되지 않아 그대로 rethrow되고 `error.tsx`로 흡수됨을 확인. 테스트 후 해당 서버 종료, 정상 키로 재기동.
- [x] 회귀: 필수 속성 누락 픽스처(`INVOICE-2026-000-NODATE`)에서 Zod 파싱 실패가 여전히 404가 아닌 `error.tsx`로 흡수되는지 검증(Task 007 동작 유지 확인) — Pass. `extractDate`가 던진 에러가 `InvoiceNotFoundError`가 아니므로 그대로 rethrow되어 `error.tsx`가 렌더됨.

## 변경 사항 요약

- `lib/notion.ts`: `InvoiceNotFoundError` 클래스, `isValidNotionPageIdFormat` 정규식 검증 헬퍼, `NOT_FOUND_ERROR_CODES`(`ObjectNotFound`/`RestrictedResource`) 상수 추가. `getInvoice`가 진입 시 ID 형식을 먼저 검증하고, `notion.pages.retrieve`를 try/catch로 감싸 위 두 에러 코드만 `InvoiceNotFoundError`로 변환(그 외 에러는 그대로 rethrow).
- `app/(site)/invoice/[notionPageId]/page.tsx`: `getInvoice` 호출을 try/catch로 감싸 `InvoiceNotFoundError`만 `notFound()`로 변환. `generateMetadata`의 stale한 "Task 008에서 추가" 주석 정리(그 외 로직 변경 없음).
- 정적 검증(`tsc --noEmit`, `lint`) 통과. Playwright MCP로 정상/404(신규 회귀)/형식 오류/설정 오류 회귀/Zod 회귀 5개 시나리오 모두 Pass 확인.
