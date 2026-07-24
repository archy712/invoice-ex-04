import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  // F011: 존재하지 않는 견적서(또는 잘못된 경로) 접근 시 안내 메시지 표시
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold tracking-tight">
        견적서를 찾을 수 없습니다
      </h1>
      <p className="text-muted-foreground text-sm">
        요청하신 링크에 해당하는 견적서가 존재하지 않거나 삭제되었습니다.
        <br />
        링크가 올바른지 다시 확인하시거나, 발행자에게 문의해 주세요.
      </p>
      <Button nativeButton={false} render={<Link href="/">홈으로 돌아가기</Link>} />
    </div>
  );
}
