# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 제공하는 가이드입니다.

@AGENTS.md

## 명령어

- `npm run dev` — 개발 서버 실행 (Turbopack, 기본 포트 3000)
- `npm run build` — 프로덕션 빌드 (Turbopack)
- `npm run start` — 프로덕션 빌드 실행
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit` — 타입 체크만 수행 (package.json에 별도 typecheck 스크립트 없음)

이 저장소에는 별도의 테스트 러너가 구성되어 있지 않습니다.

## 아키텍처

Next.js 16 App Router 프로젝트 (React 19, Turbopack 전용, Pages Router 없음). 경로 별칭 `@/*`는 저장소 루트로 매핑됩니다 (`tsconfig.json` 참고).

**라우트 구조** — `app/` 아래 두 개의 독립된 레이아웃 트리:
- `app/(site)/` — 마케팅/쇼케이스 사이트, `app/(site)/layout.tsx`(Header + Footer)로 감쌈. 라우트: `/`(홈), `/gallery`(컴포넌트 쇼케이스 탭), `/gallery/form`(react-hook-form + zod 예제), `/gallery/table`(테이블/카드리스트 전환 예제).
- `app/dashboard/` — 별도 레이아웃(`app/dashboard/layout.tsx`)으로 shadcn `Sidebar` 셸(`SidebarProvider`/`AppSidebar`/`SidebarInset`) 사용. 라우트: `/dashboard`.
- 루트 `app/layout.tsx`는 `ThemeProvider` → `TooltipProvider` → `{children}` + `Toaster` 순으로 감싸며, 서버 루트 레이아웃에서 모든 클라이언트 프로바이더를 마운트합니다.

**컴포넌트 레이어** (`components/`):
- `ui/` — `@base-ui/react` 기반(Radix 아님) shadcn/ui 프리미티브, `shadcn` CLI로 생성됨. `components.json` 설정: 스타일 `base-nova`, 기본 색상 `neutral`, 아이콘 라이브러리 `lucide`. 생성된 코드로 취급하고 직접 수정보다는 조합해서 사용하며, 새 프리미티브 추가 시 `shadcn` 컨벤션으로 재생성/확장하세요.
- `layout/` — 사이트 공통 UI: `header.tsx`, `footer.tsx`, `app-sidebar.tsx`, `theme-provider.tsx`, `theme-toggle.tsx`.
- `sections/` — 홈페이지 섹션 (`hero-section.tsx`, `features-section.tsx`, `cta-section.tsx`).
- `gallery/` — `/gallery`의 탭으로 렌더링되는 카테고리별 쇼케이스 패널 (`inputs-showcase.tsx`, `navigation-showcase.tsx`, `feedback-showcase.tsx`, `overlay-showcase.tsx`, `data-display-showcase.tsx`, `hooks-showcase.tsx`)과 공통 래퍼 `showcase-section.tsx`.
- `examples/` — 갤러리/대시보드 페이지에서 참조하는 규모 있는 예제: `contact-form.tsx`(react-hook-form + zod, `lib/validations.ts`로 검증), `dashboard-chart.tsx`(recharts), `user-table.tsx`, `stat-card.tsx`.

**폼**: `react-hook-form` + `@hookform/resolvers/zod`, 스키마는 `lib/validations.ts`에 위치. `@base-ui/react` 기반 `components/ui/*` 프리미티브(예: `Select`)에 `Controller`를 연결할 때는 `field.value` 대신 `field.value ?? null`을 전달하세요 — Base UI 컴포넌트는 첫 렌더에서 `value` prop이 `undefined`가 아닐 때만 controlled로 동작하므로, 초기값이 `undefined`인 RHF 필드는 값이 설정되는 순간 uncontrolled→controlled 경고를 발생시킵니다.

**Hooks** (`hooks/`): `use-mounted.ts`, `use-media-query.ts`(`react-responsive` 래핑), `use-local-storage.ts`(`use-local-storage-state` 래핑), `use-mobile.ts`(shadcn 사이드바 모바일 브레이크포인트 감지).

**스타일링**: `@tailwindcss/postcss`를 통한 Tailwind v4 (`tailwind.config.*` 없음 — 설정은 `app/globals.css`의 `@theme`에 위치). `lib/utils.ts`는 `components/ui/*` 전반에서 사용하는 표준 `cn()`(`clsx` + `tailwind-merge`) 헬퍼를 export합니다.
