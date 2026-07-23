# 견적서 시스템

노션(Notion)을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF로 다운로드할 수 있는 시스템입니다.

## 🎯 프로젝트 개요

**목적**: 노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF 다운로드할 수 있는 시스템
**범위**: MVP — 견적서 조회 및 PDF 다운로드 (관리자 대시보드 등은 MVP 이후로 제외)
**사용자**: 견적서를 발행하는 프리랜서/소규모 기업과 견적서를 받는 클라이언트

## 📱 주요 페이지

1. **견적서 조회 페이지** (`/invoice/[notionPageId]`) — 고유 링크로 접근해 견적서 내용(회사정보, 항목, 금액 등)을 확인하고 PDF로 다운로드. 인증 불필요, 공개 접근.
2. **404 에러 페이지** — 존재하지 않는 견적서 ID로 접근 시 "견적서를 찾을 수 없습니다" 안내 표시.

> MVP에서는 별도의 관리자 페이지가 없습니다. 견적서 작성 및 관리는 노션 데이터베이스에서 직접 이루어집니다.

## ⚡ 핵심 기능

- **노션 데이터베이스 연동**: Notion API를 통해 견적서 데이터를 실시간 조회
- **견적서 조회**: 고유 URL로 특정 견적서 내용(발행일, 유효기간, 항목별 금액, 총액 등) 표시
- **PDF 다운로드**: 견적서를 PDF 파일로 변환해 즉시 다운로드
- **견적서 유효성 검증**: 존재하지 않는 견적서 접근 시 404 에러 처리
- **반응형 레이아웃**: 모바일/태블릿/데스크톱 대응

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4 (`app/globals.css`의 `@theme`)
- **UI Components**: shadcn/ui (`@base-ui/react` 기반), Lucide React
- **Forms**: React Hook Form + Zod
- **Database/Auth**: Supabase (Auth + PostgreSQL, 견적서/품목 캐시 저장)
- **Data Source**: Notion API (`@notionhq/client`)
- **PDF 생성**: `@react-pdf/renderer`
- **배포**: Vercel

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.local.example .env.local
# .env.local에 NOTION_API_KEY, NOTION_DATABASE_ID 등 값 입력

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm run start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 정리 (스타터킷 데모 콘텐츠 제거)
- ⏳ Notion API 연동 및 `/invoice/[notionPageId]` 라우트 구현
- ⏳ PDF 다운로드 기능 구현
- ⏳ Supabase 캐시 연동
- ⏳ 404 에러 페이지 구현

## 📖 문서

- [PRD 문서](./docs/PRD.md) — 상세 요구사항
- [개발 가이드](./CLAUDE.md) — 개발 지침
