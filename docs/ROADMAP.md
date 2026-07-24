# 노션 기반 견적서 관리 시스템 개발 로드맵

노션을 데이터베이스로 활용해, 클라이언트가 고유 URL에서 견적서를 조회하고 PDF로 다운로드할 수 있는 인증 불필요 공개 시스템.

## 개요

**견적서 시스템**은 견적서를 발행하는 프리랜서/소규모 기업과 이를 수신하는 클라이언트를 위한 노션 기반 견적서 공개 뷰어로, 다음 기능을 제공합니다:

- **노션 데이터베이스 연동 (F001)**: Notion API를 통해 견적서 원본 데이터를 조회 (별도 관리자 페이지 없이 노션을 직접 DB로 사용)
- **견적서 조회 (F002)**: 고유 URL(`/invoice/[notionPageId]`)로 특정 견적서를 웹에서 렌더링
- **PDF 다운로드 (F003)**: 조회한 견적서를 PDF 파일로 변환 및 즉시 다운로드
- **지원 기능**: 견적서 URL 생성(F010), 존재하지 않는 견적서에 대한 404 유효성 검증(F011), 반응형 레이아웃(F012)

**핵심 아키텍처**: Next.js 16 App Router(React 19, Turbopack) · TypeScript 5 · TailwindCSS v4 · shadcn/ui(`@base-ui/react`) · Notion API(`@notionhq/client`) · Supabase(캐시) · `@react-pdf/renderer` · Vercel 배포

> 상세 요구사항은 [`docs/PRD.md`](./PRD.md) 참조.

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-routing-skeleton.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **Notion API/PDF/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함**: 정상 플로우, 에러 케이스, 엣지 케이스별로 Playwright MCP 테스트 시나리오를 구체적으로 나열하고, 각 항목을 미완료 체크박스(`- [ ]`)로 작성 (구현 완료 후 Pass 시 `- [x]`로 갱신)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조 (현재 작업이 `012`라면 `011`, `010`을 참조)
   - 새 작업은 빈 체크박스 상태로 작성하며 변경 사항 요약은 비워 둠. 초기 상태 샘플은 `000-sample.md` 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - **Notion 연동·PDF 생성·404 처리 등 데이터/비즈니스 로직 구현 시 "🧪 필수 테스트 프로세스"의 6단계를 반드시 순서대로 수행 (구현 → 테스트 시나리오 작성 → Playwright MCP 실행 → 결과 검증 → 실패 시 재작업 → 완료 표시)**
   - Playwright MCP 테스트는 실제 브라우저 환경에서 시나리오를 하나씩 실행하며, mock이나 정적 분석으로 대체할 수 없음
   - 각 시나리오의 Pass/Fail을 작업 파일에 기록하고, 실패 시 원인 분석 → 코드 수정 → 재실행을 모든 시나리오가 Pass할 때까지 반복
   - **테스트가 필요한 작업은 테스트를 생략하고 완료(✅)로 표시할 수 없음 — 모든 시나리오가 Pass한 뒤에만 완료 표시 + 테스트 결과 요약을 남김**
   - 각 단계 후 작업 파일 내 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 0: 프로젝트 기반 (스타터킷) ✅

> 스타터킷 정리가 완료되어 견적서 시스템 실제 기능 구현을 시작할 수 있는 상태입니다.

- **Task 000: 프로젝트 초기 설정 및 스타터킷 정리** ✅ - 완료
  - ✅ Next.js 16 App Router(React 19, Turbopack) 프로젝트 뼈대 구성
  - ✅ `app/(site)/` 공개 사이트 레이아웃(Header + Footer) 및 `/` 안내 페이지 구성
  - ✅ `components/ui/*` — `@base-ui/react` 기반 shadcn/ui 프리미티브 세트 보존 (견적서 뷰어 재사용 대상)
  - ✅ `components/layout/*` — header, footer, theme-provider, theme-toggle 구성
  - ✅ `hooks/*` — use-mounted, use-media-query(F012 반응형), use-local-storage, use-mobile 구성
  - ✅ `lib/utils.ts` — `cn()` 헬퍼 / TailwindCSS v4 `@theme` 스타일 시스템 구성
  - ✅ `.env.local.example` 환경 변수 템플릿 및 데모 콘텐츠 제거

---

### Phase 1: 애플리케이션 골격 및 데이터 계층 설계

> 실제 기능 구현 전, 라우트 껍데기·타입·데이터 클라이언트 골격을 먼저 완성합니다. (구조 우선 접근법)

- **Task 001: 견적서 라우트 골격 및 404 구조 생성** ✅ - 완료
  - ✅ `app/(site)/invoice/[notionPageId]/page.tsx` 빈 서버 컴포넌트 껍데기 생성 (동적 라우트 등록)
  - ✅ `app/(site)/invoice/[notionPageId]/loading.tsx` 로딩 스켈레톤 골격 생성
  - ✅ 전역 `app/not-found.tsx` 404 페이지 껍데기 생성 (F011)
  - ✅ Next.js 16 동적 라우트 params 규약(비동기 `params`) 확인 — `node_modules/next/dist/docs/` 가이드 준수
  - ✅ 각 껍데기에서 라우트가 정상 렌더되는지 개발 서버로 확인 (상세: `tasks/001-invoice-route-skeleton.md`)

- **Task 002: 견적서 도메인 타입 및 검증 스키마 정의**
  - `types/invoice.ts` — `Invoice`, `InvoiceItem` 인터페이스 정의 (PRD 데이터 모델 F001 기준: invoice_number, client_name, issue_date, valid_until, items, total_amount, status)
  - `lib/validations.ts` — Zod 스키마로 Notion 응답 파싱/검증 스키마 정의 (`invoiceSchema`, `invoiceItemSchema`)
  - Notion API 응답 원본 타입 → 도메인 타입 매핑 인터페이스 설계 (구현은 Phase 3)
  - `status` Select 값(대기/승인/거절) 유니온 타입 정의

- **Task 003: 데이터 접근 계층 및 환경 변수 골격 구성**
  - `@notionhq/client`, `@supabase/supabase-js`, `@react-pdf/renderer` 의존성 설치
  - `lib/notion.ts` — Notion 클라이언트 초기화 골격 (`getInvoice(pageId)` 시그니처만, 구현은 Phase 3)
  - `lib/supabase.ts` — Supabase 클라이언트 초기화 골격 (견적서 캐시용)
  - `.env.local.example` 갱신: `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`
  - 최신 API 확인을 위해 Context7 MCP로 `@notionhq/client` / Supabase 문서 조회

---

### Phase 2: UI/UX 완성 (더미 데이터 활용)

> 실제 Notion 연동 없이 더미 데이터로 견적서 뷰어와 404 페이지 UI를 완성합니다. 백엔드와 병렬 개발 가능.

- **Task 004: 더미 데이터 및 견적서 표시용 유틸리티 작성**
  - `lib/dummy-data.ts` — Task 002 타입을 따르는 견적서/항목 더미 데이터 생성
  - 통화 포맷(`Intl.NumberFormat` KRW), 날짜 포맷(`date-fns`) 유틸리티 작성
  - 총액/소계 계산 유틸리티(수량 × 단가) 작성

- **Task 005: 견적서 뷰어 컴포넌트 구현 (더미 데이터)**
  - `components/invoice/invoice-header.tsx` — 견적서 번호, 발행일, 유효기간, 상태 뱃지
  - `components/invoice/invoice-client-info.tsx` — 발행자/클라이언트 정보
  - `components/invoice/invoice-items-table.tsx` — 항목별 설명·수량·단가·금액 테이블
  - `components/invoice/invoice-summary.tsx` — 총액 요약 영역
  - `components/invoice/invoice-view.tsx` — 위 컴포넌트를 조합한 최상위 뷰어
  - `components/ui/*` 기존 프리미티브(Card, Table, Badge, Button 등) 재사용
  - `/invoice/[notionPageId]` 페이지에 더미 데이터로 뷰어 연결

- **Task 006: 404 및 로딩/에러 상태 UI 완성**
  - 404 페이지 UI 완성 (F011): "견적서를 찾을 수 없습니다" + 발행자 문의 안내 (PRD 404 명세 준수)
  - 로딩 스켈레톤 UI 완성 (`loading.tsx`)
  - PDF 다운로드 버튼 UI 배치 (동작은 Phase 3, 여기서는 자리만)

---

### Phase 3: 핵심 기능 구현 (Notion 연동 · PDF)

> 더미 데이터를 실제 Notion API 데이터로 교체하고, PDF 다운로드와 캐시를 구현합니다.

- **Task 007: Notion API 견적서 데이터 조회 구현** - 우선순위
  - `lib/notion.ts` — `getInvoice(pageId)` 실제 구현: `notion.pages.retrieve` + 항목 Relation 조회
  - Notion 페이지 속성 → 도메인 `Invoice` 타입 매핑 (Zod 스키마로 파싱/검증)
  - 견적 항목(Items) Relation 조회 및 금액 계산 검증
  - Server Component에서 `getInvoice` 호출해 실데이터 렌더 (더미 데이터 제거)
  - 최신 Notion SDK 문법 확인을 위해 Context7 MCP로 `@notionhq/client` 문서 조회
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지:
    - 정상: 유효한 `notionPageId` 접근 시 견적서 번호·클라이언트·발행일·항목·총액이 Notion 원본과 일치하게 렌더되는지 검증
    - 정상: 항목(Items) Relation이 정확히 조회되어 수량 × 단가 및 총액 계산이 원본과 일치하는지 검증
    - 에러: 존재하지 않는/삭제된 `notionPageId`에서 Notion API 에러가 앱 크래시 없이 처리되는지 검증
    - 엣지: 필수 속성 누락·타입 불일치(예: 날짜/숫자 형식 오류) 시 Zod 파싱 실패가 안전하게 폴백되고 500이 노출되지 않는지 검증
    - 엣지: 항목이 0개인 견적서에서 빈 테이블/총액 0원이 정상 렌더되는지 검증

- **Task 008: 견적서 유효성 검증 및 404 처리 구현 (F011)**
  - 존재하지 않는/잘못된 `notionPageId` 접근 시 Notion API 에러 캐치 → `notFound()` 호출
  - 권한 없는 페이지·삭제된 페이지·잘못된 형식 ID 케이스 분기 처리
  - Zod 파싱 실패 시 안전한 폴백 처리
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지 (성공 기준 5):
    - 정상: 유효한 `notionPageId` 접근 시 404가 아닌 견적서 뷰어가 정상 렌더되는지 검증
    - 에러: 존재하지 않는 ID 접근 시 `notFound()`가 호출되어 404 페이지("견적서를 찾을 수 없습니다" + 발행자 문의 안내)가 표시되는지 검증
    - 에러: 권한 없는/삭제된 페이지 접근 시 500이 아닌 404 페이지로 처리되는지 검증
    - 엣지: 형식 자체가 잘못된 ID(빈 문자열·비정상 길이·특수문자)에서도 404로 안전하게 폴백되는지 검증
    - 엣지: Zod 파싱 실패 케이스에서 부분 렌더나 크래시 없이 폴백 처리가 동작하는지 검증

- **Task 009: Supabase 견적서 캐시 레이어 구현**
  - Supabase에 견적서/항목 캐시 테이블 스키마 생성 (Notion 재조회 비용 절감)
  - `lib/notion.ts` 조회 시 캐시 우선 조회 → 미스 시 Notion 조회 후 캐시 갱신 로직
  - 캐시 무효화(TTL 또는 재검증) 전략 적용
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지:
    - 정상(캐시 미스): 최초 조회 시 Notion에서 데이터를 가져와 렌더하고 캐시에 저장되는지 검증
    - 정상(캐시 히트): 재조회 시 캐시 경로로 응답하며 미스 경로와 동일한 견적서가 렌더되는지 검증
    - 엣지: 캐시 TTL 만료·무효화 후 재조회 시 Notion 재조회 → 캐시 갱신이 동작하는지 검증
    - 에러: Supabase 조회 실패 시 Notion 직접 조회로 폴백되어 견적서가 여전히 렌더되는지 검증
    - 엣지: Notion 원본 변경 후 캐시 값과의 정합성(재검증 시점) 처리가 의도대로 동작하는지 검증

- **Task 010: PDF 다운로드 기능 구현 (F003)**
  - `components/invoice/invoice-pdf.tsx` — `@react-pdf/renderer` 기반 PDF 문서 컴포넌트 (웹 뷰어와 레이아웃 일관성 유지)
  - PDF 다운로드 방식 결정 및 구현 (API Route `app/api/generate-pdf/route.ts` 또는 클라이언트 사이드 `pdf().toBlob()`)
  - PDF 다운로드 버튼 클릭 → 견적서 PDF 생성 및 즉시 다운로드 연결
  - 한글 폰트 임베딩 및 통화/날짜 포맷 처리
  - 최신 `@react-pdf/renderer` API 확인을 위해 Context7 MCP 문서 조회
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지 (성공 기준 3):
    - 정상: PDF 다운로드 버튼 클릭 시 실제 다운로드 이벤트가 발생하고 파일이 저장되는지 검증
    - 정상: 생성된 PDF의 내용(견적서 번호·항목·총액·한글)이 웹 뷰어와 일치하고 한글 폰트가 깨지지 않는지 검증
    - 정상: 동일 견적서를 연속 재다운로드해도 정상 동작하는지 검증
    - 엣지: 항목이 많은 대용량 견적서에서 페이지 분할·레이아웃이 깨지지 않는지 검증
    - 엣지: 항목 0개·긴 문자열·통화/날짜 포맷 경계값에서 PDF 생성이 실패 없이 처리되는지 검증
    - 에러: PDF 생성 실패 시 버튼이 크래시 없이 에러 상태(토스트 등)로 안전하게 처리되는지 검증

- **Task 010-1: 핵심 기능 통합 테스트 (E2E)**
  - Playwright MCP로 전체 클라이언트 여정 검증: 링크 접속 → 견적서 조회 → PDF 다운로드
  - Notion 연동·PDF·404 엣지 케이스(빈 항목, 만료된 견적서, 대용량 항목) 검증
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지 (MVP 성공 기준 1~5 전체):
    - 정상: 유효한 견적서 링크 접속 → 조회 → PDF 다운로드까지 전체 여정이 끊김 없이 완료되는지 검증
    - 에러: 잘못된/존재하지 않는 링크 접속 시 404 페이지로 처리되는지 검증
    - 엣지: 빈 항목·만료된(유효기간 경과) 견적서·대용량 항목 견적서 각각에서 조회와 PDF 생성이 정상 동작하는지 검증
    - 통합: Task 007~010의 개별 시나리오가 캐시 히트/미스 경로를 포함해 조합 상황에서도 회귀 없이 동작하는지 검증
    - MVP 성공 기준 1~5 전체 Pass를 최종 확인하고 결과 요약 기록

---

### Phase 4: 반응형 · 최적화 · 배포

> MVP 마무리. 다양한 기기 대응, 성능, 배포 파이프라인을 완성합니다.

- **Task 011: 반응형 레이아웃 대응 (F012)**
  - `use-media-query` 훅 활용, 모바일/태블릿/데스크톱 견적서 뷰어 레이아웃 최적화
  - 항목 테이블 모바일 대응(가로 스크롤 또는 카드형 전환)
  - PDF 다운로드 버튼 및 헤더 반응형 배치
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지 (성공 기준 4):
    - 정상: 데스크톱 뷰포트에서 견적서 뷰어·항목 테이블·헤더가 정상 렌더되는지 검증
    - 정상: 태블릿 뷰포트에서 레이아웃 붕괴 없이 렌더되고 PDF 다운로드 버튼이 조작 가능한지 검증
    - 정상: 모바일 뷰포트에서 항목 테이블이 가로 스크롤/카드형으로 전환되어 가독성이 유지되는지 검증
    - 엣지: 초소형 화면·가로/세로 회전·긴 클라이언트명/항목 설명에서 오버플로우·잘림이 없는지 검증
    - 정상: 모든 뷰포트에서 PDF 다운로드 버튼 클릭이 실제로 동작하는지 검증

- **Task 012: 성능 최적화 및 Vercel 배포**
  - Server Component 캐싱/재검증(`revalidate`) 전략 적용, Notion 조회 최소화
  - 메타데이터·OG 태그·favicon 정리, Lighthouse 점검
  - Vercel 배포 및 프로덕션 환경 변수 설정(`NOTION_API_KEY`, `NOTION_DATABASE_ID`, Supabase 키)
  - 프로덕션 URL에서 전체 MVP 성공 기준 최종 검증
  - **## 테스트 체크리스트 (Playwright MCP)** — 모든 시나리오 Pass 전까지 완료(✅) 표시 금지:
    - 정상: 프로덕션 URL에서 유효한 견적서 조회 → PDF 다운로드 스모크 테스트가 통과하는지 검증
    - 정상: 프로덕션 환경 변수(`NOTION_API_KEY`·`NOTION_DATABASE_ID`·Supabase 키)가 정상 로드되어 실데이터가 조회되는지 검증
    - 에러: 프로덕션에서 잘못된 URL 접근 시 404 페이지가 표시되는지 검증
    - 엣지: 재검증(`revalidate`) 이후 최신 Notion 데이터가 반영되고 캐시가 갱신되는지 검증
    - 정상: 프로덕션에서 MVP 성공 기준 1~5 전체 Pass를 최종 확인하고 결과 요약 기록

---

## MVP 이후 로드맵 (PRD 향후 개선 방향)

> 아래 단계는 MVP 출시 후 사용자 피드백을 기반으로 진행합니다. 세부 Task는 각 단계 착수 시 구체화합니다.

### Phase 5: 관리 기능 (PRD Phase 2)

- **Task 013: 관리자 대시보드** — 발행한 견적서 목록 뷰 (Supabase 인증(Auth) 도입)
- **Task 014: 견적서 상태 관리** — 승인/거절/대기 상태 추적 및 표시
- **Task 015: 견적서 검색 및 필터링** — 클라이언트명·상태·기간별 검색

### Phase 6: 자동화 (PRD Phase 3)

- **Task 016: 이메일 자동 발송** — SendGrid/Resend 연동, 견적서 링크 발송
- **Task 017: 견적서 만료 알림** — 유효기간 기반 알림 스케줄링
- **Task 018: 클라이언트 응답 트래킹** — 열람/다운로드 이벤트 로깅

### Phase 7: 고급 기능 (PRD Phase 4)

- **Task 019: 다중 템플릿 지원** — 견적서 템플릿 커스터마이징
- **Task 020: 다국어 견적서** — i18n 도입
- **Task 021: 전자 서명 기능** — 클라이언트 승인 서명
- **Task 022: 견적서 버전 관리** — 변경 히스토리 추적

---

## MVP 성공 기준 추적

| # | 성공 기준 | 관련 Task | 상태 |
| - | --------- | --------- | ---- |
| 1 | 노션 DB에서 견적서 정보를 정상 조회 | Task 007 | ⬜ |
| 2 | 고유 URL 접근 시 견적서 정확히 표시 | Task 005, 007 | ⬜ |
| 3 | PDF 다운로드 버튼 클릭 시 PDF 다운로드 | Task 010 | ⬜ |
| 4 | 모바일/태블릿/데스크톱 정상 작동 | Task 011 | ⬜ |
| 5 | 잘못된 URL 접근 시 적절한 에러 표시 | Task 006, 008 | ⬜ |

---

**문서 버전**: v1.0 · **기준 PRD**: `docs/PRD.md` v1.0 (MVP) · **로드맵 시작점**: 스타터킷 정리 완료(Phase 0 ✅), Notion 연동부터 실제 구현 시작
