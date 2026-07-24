import { Client } from "@notionhq/client";

import type { Invoice } from "@/types/invoice";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getInvoice(pageId: string): Promise<Invoice> {
  throw new Error(`not implemented: getInvoice(${pageId})`); // Phase 3(Task 007)에서 구현
}

export { notion };
