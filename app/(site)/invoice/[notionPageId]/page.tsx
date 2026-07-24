import type { Metadata } from "next";

import { InvoiceView } from "@/components/invoice/invoice-view";
import { getInvoice } from "@/lib/notion";

// 견적서별 동적 title/OG. 조회 실패는 전체 라우트를 깨뜨리지 않도록 폴백 title을 유지한다
// (메타데이터 생성은 외부 API 경계이므로 방어적으로 처리) — 404 전용 처리는 Task 008에서 추가.
export async function generateMetadata({
  params,
}: PageProps<"/invoice/[notionPageId]">): Promise<Metadata> {
  const { notionPageId } = await params;

  try {
    const invoice = await getInvoice(notionPageId);
    return {
      title: `견적서 ${invoice.invoiceNumber} · ${invoice.clientName}`,
    };
  } catch {
    return {
      title: `견적서 ${notionPageId}`,
    };
  }
}

export default async function InvoicePage({
  params,
}: PageProps<"/invoice/[notionPageId]">) {
  const { notionPageId } = await params;

  // 조회 실패(존재하지 않는 페이지, Zod 파싱 실패 등)는 여기서 삼키지 않고
  // 그대로 throw해 app/(site)/invoice/[notionPageId]/error.tsx 바운더리가 흡수하도록 한다.
  const invoice = await getInvoice(notionPageId);

  return <InvoiceView invoice={invoice} />;
}
