import type { Metadata } from "next";

import { InvoiceView } from "@/components/invoice/invoice-view";
import { dummyInvoice } from "@/lib/dummy-data";

// 견적서별 동적 title/OG 골격. 실제 조회는 getInvoice(notionPageId) 구현 이후(Task 007) 연결한다 —
// 지금은 lib/notion.ts의 getInvoice가 not implemented라 여기서 호출하지 않는다.
export async function generateMetadata({
  params,
}: PageProps<"/invoice/[notionPageId]">): Promise<Metadata> {
  const { notionPageId } = await params;

  // TODO(Phase 3/Task 007): getInvoice(notionPageId) 조회 결과의 견적서 번호/클라이언트명으로 교체
  return {
    title: `견적서 ${notionPageId}`,
  };
}

export default async function InvoicePage({
  params,
}: PageProps<"/invoice/[notionPageId]">) {
  // notionPageId는 Phase 3(Task 007)에서 getInvoice(notionPageId) 조회에 사용될 예정이며,
  // 지금은 더미 데이터 뷰어(Task 005) 연결 단계라 직접 사용하지 않는다.
  await params;

  // TODO(Phase 3/Task 007): dummyInvoice → getInvoice(notionPageId) 실제 Notion 데이터로 교체
  return <InvoiceView invoice={dummyInvoice} />;
}
