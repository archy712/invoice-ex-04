# AI Agent 개발 규칙 (견적서 시스템)

> 이 문서는 AI Agent 전용 운영 규칙입니다. 일반적인 Next.js/React/Tailwind 개발 지식은 포함하지 않습니다.
> 요구사항은 `docs/PRD.md`, 작업 분해/워크플로우는 `docs/ROADMAP.md`, 아키텍처 개요는 `CLAUDE.md`를 참조하세요. 이 문서는 세 문서와 중복 없이 "AI가 무엇을, 어떻게 판단하고 수정해야 하는가"만 다룹니다.

## 1. 프로젝트 개요

- **목적**: 노션을 DB로 쓰는 인증 불필요 공개 견적서 뷰어. 클라이언트가 `/invoice/[notionPageId]`에서 견적서를 조회하고 PDF로 다운로드.
- **스택**: Next.js 16(App Router, Turbopack 전용) · React 19 · TypeScript 5 · Tailwind v4 · shadcn/ui(`@base-ui/react`) · Notion API(`@notionhq/client`, 미설치) · Supabase(캐시, 미설치) · `@react-pdf/renderer`(미설치).
- **현재 상태**: Phase 0(스타터킷 정리) 완료. `/invoice/[notionPageId]` 라우트, Notion/Supabase/PDF 연동 전부 미구현. `docs/ROADMAP.md`의 Task 001부터 순서대로 진행.
- **관리자 대시보드는 MVP 범위 밖** — 어떤 요청이 와도 별도 admin 페이지/라우트를 생성하지 말 것 (`docs/PRD.md` "MVP 이후 기능" 참조).

## 2. 이 저장소는 학습 데이터와 다른 Next.js 버전을 사용함 (최우선 규칙)

- **반드시** App Router 라우팅/데이터 fetching 코드를 작성하기 전에 `node_modules/next/dist/docs/`(특히 `01-app/`) 하위의 관련 가이드를 먼저 읽을 것. (`AGENTS.md` 참조)
- 동적 라우트 `params`는 이 버전에서 비동기(`Promise`)일 수 있음 — 학습 데이터의 동기 `params` 패턴을 그대로 쓰지 말고 문서로 확인 후 작성.
- Deprecation 경고가 보이면 무시하지 말고 `node_modules/next/dist/docs/`에서 대체 API를 확인.
- 라이브러리 API(Notion/Supabase/react-pdf/next 자체 포함) 사용법이 불확실하면 Context7 MCP로 최신 문서를 조회한 뒤 작성 (학습 데이터 신뢰 금지).

## 3. 라우트/디렉터리 배치 규칙

- 공개 페이지는 반드시 `app/(site)/` 아래에 생성 (Header+Footer 레이아웃 상속). `app/` 루트에 직접 `page.tsx`를 추가하지 말 것.
- 견적서 조회 라우트는 `app/(site)/invoice/[notionPageId]/page.tsx`에 생성하고, 동일 디렉터리에 `loading.tsx`(로딩 스켈레톤), `not-found.tsx`(F011 404)를 함께 둘 것.
- 잘못된/존재하지 않는 `notionPageId` 처리는 수동 redirect가 아니라 Next의 `notFound()` 호출로 구현할 것 (PRD F011).
- API Route가 필요한 경우(PDF 생성 등) `app/api/<name>/route.ts` 형태로 생성.

## 4. 컴포넌트 레이어 규칙

- `components/ui/*`는 `shadcn` CLI로 생성된 코드(스타일 `base-nova`, `@base-ui/react` 기반, Radix 아님)로 취급 — 내부 구현을 직접 수정하지 말 것. 새 프리미티브가 필요하면 `shadcn` 컨벤션으로 생성/확장.
  - 나쁜 예: `components/ui/select.tsx` 내부 로직을 직접 고쳐서 견적서 전용 동작을 추가.
  - 좋은 예: `components/ui/select.tsx`를 그대로 두고 `components/invoice/*`에서 조합해 사용.
- 견적서 도메인 컴포넌트는 `components/invoice/*`에 생성 (`docs/ROADMAP.md` Task 005 명명 예시: `invoice-header.tsx`, `invoice-client-info.tsx`, `invoice-items-table.tsx`, `invoice-summary.tsx`, `invoice-view.tsx`).
- 사이트 공통 UI(`header.tsx`, `footer.tsx`, `theme-provider.tsx`, `theme-toggle.tsx`)는 `components/layout/*`에 위치, 최소 구성 유지 — 여기에 견적서 전용 UI를 섞지 말 것.

## 5. 폼/검증 규칙

- 모든 Zod 스키마는 `lib/validations.ts`에 정의 (현재는 컨벤션 안내만 있는 빈 파일). 컴포넌트 파일 내부에 인라인 스키마를 작성하지 말 것.
- `docs/ROADMAP.md` Task 002 기준: `invoiceSchema`, `invoiceItemSchema`를 이 파일에 추가하고, 대응하는 도메인 타입은 `types/invoice.ts`(신규 생성)에 정의.
- `@base-ui/react` 기반 `components/ui/*` 프리미티브(`Select` 등)에 `react-hook-form`의 `Controller`를 연결할 때는 반드시 `field.value ?? null`을 전달할 것 (`field.value` 그대로 전달 금지). 이유: Base UI는 첫 렌더에서 `value`가 `undefined`가 아닐 때만 controlled로 동작하므로, 초기값이 `undefined`인 RHF 필드는 값 설정 시점에 uncontrolled→controlled 경고가 발생함.

## 6. 스타일링 규칙

- Tailwind v4를 사용하며 `tailwind.config.*` 파일이 존재하지 않음 — 새로 만들지 말 것. 테마 커스터마이징은 `app/globals.css`의 `@theme` 블록에서 수행.
- `cn()` 헬퍼(`lib/utils.ts`)를 클래스 병합에 일관되게 사용 (`clsx` + `tailwind-merge` 직접 호출 금지, 기존 헬퍼 재사용).

## 7. 경로 별칭 규칙

- `@/*`는 저장소 루트로 매핑 (`tsconfig.json`). `components.json`이 정의한 별칭을 따를 것: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.
- 최상위 디렉터리(`components/`, `lib/`, `hooks/`) 간 상대 경로(`../../lib/utils`) import 금지 — 항상 `@/` 별칭 사용.

## 8. 환경 변수 규칙

- 실제 값이 담긴 `.env.local`은 절대 커밋하지 말 것. 새 환경 변수를 도입할 때마다 반드시 `.env.local.example`에 플레이스홀더를 함께 추가/갱신.
- 현재 정의된 변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## 9. 작업(Task) 워크플로우 규칙 (`docs/ROADMAP.md`와 연동, 필수 준수)

- 새 기능 작업은 반드시 `/tasks/XXX-description.md` 파일로 먼저 생성 (번호는 `/tasks` 디렉터리의 마지막 완료 작업 다음 번호, 예: 마지막이 `011`이면 다음은 `012`). 파일 없이 바로 구현 착수 금지.
- Notion API 연동, PDF 생성, 기타 비즈니스 로직을 다루는 작업 파일에는 **"## 테스트 체크리스트" 섹션이 필수**이며, 정상/에러/엣지 케이스별 Playwright MCP 시나리오를 미완료 체크박스(`- [ ]`)로 나열할 것.
- 해당 작업을 완료(✅)로 표시하려면 나열된 모든 시나리오가 Playwright MCP로 실제 실행되어 Pass해야 하며, 각 시나리오를 `- [x]`로 갱신하고 결과 요약을 남길 것. **Mock이나 정적 분석으로 대체하거나, 테스트를 생략하고 완료 표시하는 것은 금지.**
- 실패한 시나리오는 원인 분석 → 코드 수정 → 재실행을 모든 시나리오가 Pass할 때까지 반복.
- 작업 완료 후 `docs/ROADMAP.md`에서 해당 Task를 ✅로 갱신할 것 — 작업 파일만 갱신하고 로드맵을 갱신하지 않는 것은 금지.
- 각 구현 단계 완료 후에는 중단하고 추가 지시를 기다릴 것 (연속으로 다음 Task까지 임의로 진행하지 말 것).

## 10. 다중 파일 연동 규칙

- `docs/PRD.md`(요구사항 원본) 변경 시 → `docs/ROADMAP.md`의 관련 Phase/Task 설명을 함께 갱신해 두 문서의 불일치를 방지할 것.
- `CLAUDE.md`는 아키텍처/컨벤션이 실제로 바뀔 때만 갱신 (예: 새 디렉터리 레이어 추가, 새 폼 컨벤션 확정). 단순 작업 진행 상황은 `docs/ROADMAP.md`에서만 추적 — 진행 상황을 이유로 `CLAUDE.md`를 건드리지 말 것.
- `.env.local.example`을 갱신했다면 `docs/PRD.md`의 "환경 변수 설정" 섹션 및 `CLAUDE.md`의 "아직 구현되지 않음" 목록도 최신 상태와 맞는지 확인.

## 11. 빌드/검증 명령 규칙

- 이 저장소에는 별도 테스트 러너(jest/vitest 등)가 없음 — `npm test`가 존재한다고 가정하거나 새로 추가하지 말 것. 비즈니스 로직 검증은 §9의 Playwright MCP 시나리오로 수행.
- 코드 변경 후 `npm run lint`와 `npx tsc --noEmit`(package.json에 별도 `typecheck` 스크립트 없음, 이 명령을 직접 사용)을 실행해 검증할 것.
- 개발 서버 확인은 `npm run dev`(Turbopack, 기본 포트 3000).

## 12. AI 의사결정 기준 (모호한 상황 처리)

- "새 UI 프리미티브가 필요한가, 기존 걸 조합할 것인가" 판단 시: 먼저 `components/ui/*`에 동등한 프리미티브가 있는지 확인 → 있으면 조합, 없으면 `shadcn` 컨벤션으로 생성 → 그래도 부족하면 `components/invoice/*`에 조합 컴포넌트 작성. `components/ui/*` 직접 수정은 최후에도 선택지가 아님.
- "이 작업이 `/tasks` 파일과 테스트 체크리스트가 필요한가" 판단 시: Notion/Supabase/PDF/견적서 도메인 로직을 다루면 필요, 순수 UI 뼈대(레이아웃/스타일만)이면 불필요 — 단, 불확실하면 필요하다고 간주.
- 라우팅/데이터 fetching 관련 API 사용법이 학습 데이터와 다를 수 있다는 의심이 들면, 추측하지 말고 `node_modules/next/dist/docs/` 또는 Context7 MCP로 먼저 확인.

## 13. 금지 사항

- **금지**: 관리자 대시보드, 로그인/인증 플로우 추가 (MVP는 인증 불필요 공개 시스템).
- **금지**: `tailwind.config.*` 파일 생성.
- **금지**: `components/ui/*` 프리미티브 내부 로직 직접 수정.
- **금지**: `lib/validations.ts` 밖에 Zod 스키마를 산재시키는 것.
- **금지**: `@/` 별칭이 있는데 상대 경로로 최상위 디렉터리 간 import.
- **금지**: `/tasks/XXX-description.md` 없이 기능 구현 착수.
- **금지**: Notion/PDF/비즈니스 로직 작업에서 테스트 체크리스트 없이, 또는 Playwright MCP 실행 없이 완료(✅) 표시.
- **금지**: 실제 값이 담긴 `.env.local`을 커밋하거나 `.env.local.example` 갱신 없이 새 환경 변수 사용.
- **금지**: 존재하지 않는 `npm test` 스크립트를 가정하거나 임의로 새로 추가.
- **금지**: `node_modules/next/dist/docs/` 확인 없이 이 버전의 Next.js 라우팅/데이터 API를 학습 데이터 기억만으로 작성.
