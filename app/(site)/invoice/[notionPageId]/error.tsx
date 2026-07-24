"use client"; // 에러 바운더리는 클라이언트 컴포넌트여야 함

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

// 이 라우트 세그먼트(및 하위 page/loading/not-found)에서 발생하는 예기치 못한 런타임 에러를 포착한다.
// 예: Phase 3(Task 007~009)에서 Notion/Supabase 조회 중 네트워크 오류·타임아웃 등이 여기로 전파된다.
// 존재하지 않는 견적서(F011, 404)는 notFound()로 별도 처리되며 이 바운더리를 타지 않는다 — Task 008 참조.
export default function InvoiceError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // TODO(Phase 3): Notion/Supabase 조회 실패 시 사용자 안내 문구 및 로깅 연동 다듬기 (Task 007~009)
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold tracking-tight">
        견적서를 불러오는 중 문제가 발생했습니다
      </h1>
      <p className="text-muted-foreground text-sm">
        일시적인 오류일 수 있습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={() => unstable_retry()}>다시 시도</Button>
    </div>
  );
}
