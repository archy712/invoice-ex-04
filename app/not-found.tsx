import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  // TODO(Task 006): F011 문구("견적서를 찾을 수 없습니다" + 발행자 문의 안내) 완성
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold tracking-tight">
        페이지를 찾을 수 없습니다
      </h1>
      <Button nativeButton={false} render={<Link href="/">홈으로 돌아가기</Link>} />
    </div>
  );
}
