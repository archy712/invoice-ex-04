import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvoiceView } from "@/components/invoice/invoice-view";
import { getInvoice, InvoiceNotFoundError } from "@/lib/notion";

// 견적서별 동적 title/OG. 조회 실패(404 대상이든 아니든)는 전체 라우트를 깨뜨리지 않도록
// 폴백 title을 유지한다(메타데이터 생성은 외부 API 경계이므로 방어적으로 처리).
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

  // 존재하지 않는/공유되지 않은/형식이 잘못된 견적서(InvoiceNotFoundError)만 notFound()로
  // 변환해 F011(app/not-found.tsx)로 라우팅한다. 그 외 에러(API 키 오류 등 설정성 에러,
  // Zod 파싱 실패)는 여기서 삼키지 않고 그대로 throw해 error.tsx 바운더리가 흡수하도록 한다.
  let invoice;
  try {
    invoice = await getInvoice(notionPageId);
  } catch (error) {
    if (error instanceof InvoiceNotFoundError) {
      notFound();
    }
    throw error;
  }

  return <InvoiceView invoice={invoice} />;
}
