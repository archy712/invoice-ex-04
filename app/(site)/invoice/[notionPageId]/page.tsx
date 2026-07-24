export default async function InvoicePage({
  params,
}: PageProps<"/invoice/[notionPageId]">) {
  const { notionPageId } = await params;

  // TODO(Phase 2/3): 더미 데이터 뷰어(Task 005) → 실제 Notion 데이터 뷰어(Task 007)로 교체
  return <div>invoice: {notionPageId}</div>;
}
