# Task 003: 데이터 접근 계층 골격 및 환경 변수 확인

**Phase**: Phase 1 — 애플리케이션 골격 및 데이터 계층 설계
**관련 기능**: F001(노션 데이터베이스 연동)
**상태**: ✅ 완료

## 명세

`@notionhq/client`, `@supabase/supabase-js`, `@react-pdf/renderer` 의존성을 설치하고, `lib/notion.ts`/`lib/supabase.ts`에 클라이언트 초기화 골격과 `getInvoice(pageId)` 시그니처만 작성한다. `.env.local.example`은 이미 필요한 변수를 모두 포함하고 있음을 확인했으므로, 이번 Task는 파일 자체를 갱신하는 대신 코드가 참조하는 환경 변수명이 템플릿과 정확히 일치하는지 대조하는 것으로 범위를 좁혔다.

## 관련 파일

- `package.json` (수정) — 의존성 3종 추가
- `lib/notion.ts` (신규) — Notion 클라이언트 초기화, `getInvoice` 시그니처(미구현 throw)
- `lib/supabase.ts` (신규) — Supabase 클라이언트 초기화(공개 anon 클라이언트)
- `.env.local.example` (참조, 수정 없음) — 기존 변수명 확인용
- `types/invoice.ts` (의존) — `getInvoice` 반환 타입

## 수락 기준

- [x] `npm install`로 `package.json`에 3개 의존성 추가.
- [x] `lib/notion.ts`, `lib/supabase.ts`가 타입 에러 없이 컴파일됨(`npx tsc --noEmit`).
- [x] 두 파일이 참조하는 환경 변수명이 `.env.local.example`과 정확히 일치.
- [x] `getInvoice`는 미구현 상태(throw)이며 실제 Notion 호출 코드 없음.
- [x] Context7 MCP로 `@notionhq/client`/`@supabase/supabase-js` 최신 초기화 문서를 확인한 뒤 작성.

## 구현 단계

1. Context7 MCP(`/websites/developers_notion`, `/supabase/supabase-js`)로 클라이언트 초기화 방법 확인.
2. `npm install @notionhq/client @supabase/supabase-js @react-pdf/renderer`.
3. `lib/notion.ts` 작성 — `new Client({ auth: process.env.NOTION_API_KEY })` + `getInvoice(pageId)` 시그니처(본문은 `throw`).
4. `lib/supabase.ts` 작성 — `createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)` 공개 클라이언트.
5. `.env.local.example`과 코드의 `process.env.*` 변수명을 `grep`으로 대조해 100% 일치 확인.
6. `npx tsc --noEmit`, `npm run lint` 통과 확인.

## 변경 사항 요약

- `.env.local.example`은 이번 Task에서 수정하지 않음 — 이미 `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`를 모두 포함하고 있어 최소 변경 원칙에 따라 코드 쪽 변수명을 템플릿에 맞춤.
- `lib/supabase.ts`는 공개(anon key) 클라이언트만 export — `SUPABASE_SERVICE_ROLE_KEY`를 쓰는 관리용 클라이언트(캐시 쓰기용)는 Task 009(Supabase 캐시 레이어 구현)에서 별도 함수로 분리해 추가할 예정.
- `getInvoice`는 호출 시 `Error`를 던지도록만 구현 — 실제 Notion 조회 로직은 Task 007에서 대체.
