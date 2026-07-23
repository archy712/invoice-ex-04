# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 제공하는 가이드입니다.

**견적서 시스템**은 노션을 데이터베이스로 활용해 견적서를 관리하고, 클라이언트가 고유 URL(`/invoice/[notionPageId]`)에서 견적서를 조회하고 PDF로 다운로드할 수 있는 인증 불필요 공개 시스템입니다.

📋 상세 요구사항은 @/docs/PRD.md 참조

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

**라우트 구조** — `app/` 아래:
- `app/(site)/` — 공개 사이트, `app/(site)/layout.tsx`(Header + Footer)로 감쌈. 현재 라우트: `/`(안내 페이지 — 노션 링크로 접근 안내). 다음 개발 단계에서 `/invoice/[notionPageId]`(견적서 조회 + PDF 다운로드) 라우트가 이 트리 아래 추가될 예정입니다 (PRD 참조).
- 루트 `app/layout.tsx`는 `ThemeProvider` → `TooltipProvider` → `{children}` + `Toaster` 순으로 감싸며, 서버 루트 레이아웃에서 모든 클라이언트 프로바이더를 마운트합니다.
- 관리자 대시보드는 MVP 범위에서 명시적으로 제외되었습니다 (`docs/PRD.md` "MVP 이후 기능" 참조) — 별도 어드민 페이지 없이 노션 데이터베이스를 직접 사용합니다.

**컴포넌트 레이어** (`components/`):
- `ui/` — `@base-ui/react` 기반(Radix 아님) shadcn/ui 프리미티브, `shadcn` CLI로 생성됨. `components.json` 설정: 스타일 `base-nova`, 기본 색상 `neutral`, 아이콘 라이브러리 `lucide`. 생성된 코드로 취급하고 직접 수정보다는 조합해서 사용하며, 새 프리미티브 추가 시 `shadcn` 컨벤션으로 재생성/확장하세요. 견적서 뷰어(카드, 테이블, 뱃지, 버튼 등)에 재사용할 목적으로 전체 프리미티브 세트를 보존하고 있습니다.
- `layout/` — 사이트 공통 UI: `header.tsx`, `footer.tsx`(최소 구성 — 로고/테마 토글/저작권 표기만 포함), `theme-provider.tsx`, `theme-toggle.tsx`.

**폼**: `react-hook-form` + `@hookform/resolvers/zod`, 스키마는 `lib/validations.ts`에 위치(현재는 컨벤션 안내만 존재 — 향후 견적서 관련 폼이 생기면 여기에 스키마 추가). `@base-ui/react` 기반 `components/ui/*` 프리미티브(예: `Select`)에 `Controller`를 연결할 때는 `field.value` 대신 `field.value ?? null`을 전달하세요 — Base UI 컴포넌트는 첫 렌더에서 `value` prop이 `undefined`가 아닐 때만 controlled로 동작하므로, 초기값이 `undefined`인 RHF 필드는 값이 설정되는 순간 uncontrolled→controlled 경고를 발생시킵니다.

**Hooks** (`hooks/`): `use-mounted.ts`, `use-media-query.ts`(`react-responsive` 래핑 — 반응형 레이아웃(F012)에 활용), `use-local-storage.ts`(`use-local-storage-state` 래핑), `use-mobile.ts`(shadcn 사이드바 모바일 브레이크포인트 감지, `components/ui/sidebar.tsx` 내부에서 사용).

**스타일링**: `@tailwindcss/postcss`를 통한 Tailwind v4 (`tailwind.config.*` 없음 — 설정은 `app/globals.css`의 `@theme`에 위치). `lib/utils.ts`는 `components/ui/*` 전반에서 사용하는 표준 `cn()`(`clsx` + `tailwind-merge`) 헬퍼를 export합니다.

**아직 구현되지 않음** (다음 개발 단계): Notion API 연동(`@notionhq/client`), Supabase 캐시 저장, `/invoice/[notionPageId]` 라우트, PDF 다운로드(`@react-pdf/renderer`), 404 처리. 환경 변수 템플릿은 `.env.local.example` 참고.
