# Task 001: 견적서 라우트 골격 및 전역 404 구조 생성

**Phase**: Phase 1 — 애플리케이션 골격 및 데이터 계층 설계
**관련 기능**: F002(견적서 조회), F011(견적서 유효성 검증)
**상태**: ✅ 완료

## 명세

실제 Notion 데이터 연동(Phase 3) 이전에, 견적서 조회 라우트와 전역 404 처리의 빈 껍데기를 먼저 만든다. 이 저장소의 Next.js 16은 학습 데이터와 다른 버전이므로 동적 라우트의 `params`가 `Promise`라는 점을 반드시 반영한다.

## 관련 파일

- `app/(site)/invoice/[notionPageId]/page.tsx` (신규) — 동적 라우트 페이지 껍데기
- `app/(site)/invoice/[notionPageId]/loading.tsx` (신규) — 로딩 스켈레톤
- `app/not-found.tsx` (신규) — 전역 404 페이지 껍데기
- `components/ui/skeleton.tsx` (참조) — 로딩 스켈레톤 재사용
- `components/ui/button.tsx` (참조) — 404 페이지 홈 버튼

## 수락 기준

- [x] `app/(site)/invoice/[notionPageId]/page.tsx`가 async 함수 + `await params`로 `notionPageId`를 추출해 렌더한다 (동기 접근 없음).
- [x] `/invoice/<임의값>` 접속 시 크래시 없이 Header/Footer와 함께 값이 렌더된다.
- [x] `app/not-found.tsx`가 존재하지 않는 임의 경로 접속 시 렌더된다.
- [x] `loading.tsx`가 기존 `components/ui/skeleton.tsx`를 재사용한다.
- [x] `npx tsc --noEmit`, `npm run lint` 통과.

## 구현 단계

1. `app/(site)/invoice/[notionPageId]/` 및 `tasks/` 디렉터리 생성.
2. `page.tsx` 작성 — 전역 `PageProps<'/invoice/[notionPageId]'>` 헬퍼 타입 사용, `const { notionPageId } = await params`.
3. `loading.tsx` 작성 — `Skeleton` 3개로 최소 스켈레톤 구성.
4. `app/not-found.tsx` 작성 — placeholder 문구 + `Button`(Base UI `render` prop으로 `next/link` 연결, `asChild`가 아님에 주의).
5. `npm run dev`로 `/invoice/test-id`(200) 및 임의 미존재 경로(404) 확인 → `.next/types` 갱신 확인 후 `npx tsc --noEmit` 재검증.
6. `npm run lint` 통과 확인.

## 변경 사항 요약

- Next.js 16의 `PageProps<'/invoice/[notionPageId]'>` 글로벌 헬퍼 타입은 최초 1회 `next dev`/`next build`로 라우트가 등록되어야 `.next/types`에 리터럴이 생성된다 — 신규 동적 라우트 추가 시 항상 개발 서버를 한 번 띄워 타입을 재생성한 뒤 `tsc --noEmit`을 실행할 것.
- `components/ui/button.tsx`는 `@base-ui/react` 기반이라 Radix의 `asChild` 패턴이 아니라 `render` prop 패턴(`<Button nativeButton={false} render={<Link .../>} />`)을 사용해야 한다. `components/ui/pagination.tsx`의 `PaginationLink` 구현을 참고함.
- 404 페이지 문구는 placeholder이며 Task 006에서 PRD 명세("견적서를 찾을 수 없습니다" + 발행자 문의 안내)로 완성 예정.
