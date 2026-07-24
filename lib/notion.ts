import { APIErrorCode, APIResponseError, Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse, RichTextItemResponse } from "@notionhq/client";

import { invoiceSchema } from "@/lib/validations";
import type { Invoice, InvoiceItem } from "@/types/invoice";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Items 데이터소스 ID. NOTION_DATABASE_ID(Invoices)의 "items" relation이 가리키는 대상으로,
// Notion MCP로 워크스페이스 스키마를 직접 조회해 확인함(단일 워크스페이스·고정 스키마라 하드코딩).
const ITEMS_DATA_SOURCE_ID = "3a726a4c-46b7-800d-a511-000bff1199fc";

// Notion 페이지 ID 형식(32자리 16진수, 하이픈 유무 무관). API 호출 전에 걸러
// 형식이 잘못된 값(빈 문자열·특수문자 등)에 대해 불필요한 요청을 보내지 않는다.
const NOTION_PAGE_ID_PATTERN =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

// page.tsx가 notFound()로 변환해야 하는 "견적서를 찾을 수 없음" 신호.
// API 키 오류(Unauthorized) 등 앱 설정성 에러나 Zod 파싱 실패는 이 에러로 감싸지 않고
// 그대로 throw되어 error.tsx 바운더리가 흡수하도록 둔다(Task 007 동작 유지).
export class InvoiceNotFoundError extends Error {
  constructor(pageId: string) {
    super(`견적서를 찾을 수 없습니다: ${pageId}`);
    this.name = "InvoiceNotFoundError";
  }
}

function isValidNotionPageIdFormat(pageId: string): boolean {
  return NOTION_PAGE_ID_PATTERN.test(pageId);
}

// Notion은 보안상 "존재하지 않음"과 "통합에 공유되지 않음"을 구분해 노출하지 않고
// 대부분 동일한 코드로 응답한다. 두 코드 모두 견적서 뷰어 입장에서는 "찾을 수 없음"으로 취급한다.
const NOT_FOUND_ERROR_CODES: string[] = [
  APIErrorCode.ObjectNotFound,
  APIErrorCode.RestrictedResource,
];

type PageProperties = PageObjectResponse["properties"];

function getProperty(properties: PageProperties, name: string) {
  const property = properties[name];
  if (!property) {
    throw new Error(`Notion 속성을 찾을 수 없습니다: ${name}`);
  }
  return property;
}

function joinPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join("");
}

function extractTitle(properties: PageProperties, name: string): string {
  const property = getProperty(properties, name);
  if (property.type !== "title") {
    throw new Error(`Notion 속성 타입이 title이 아닙니다: ${name}`);
  }
  return joinPlainText(property.title);
}

function extractRichText(properties: PageProperties, name: string): string {
  const property = getProperty(properties, name);
  if (property.type !== "rich_text") {
    throw new Error(`Notion 속성 타입이 rich_text가 아닙니다: ${name}`);
  }
  return joinPlainText(property.rich_text);
}

function extractDate(properties: PageProperties, name: string): string {
  const property = getProperty(properties, name);
  if (property.type !== "date") {
    throw new Error(`Notion 속성 타입이 date가 아닙니다: ${name}`);
  }
  const date = property.date;
  if (!date) {
    throw new Error(`Notion 필수 날짜 속성이 비어 있습니다: ${name}`);
  }
  return date.start;
}

function extractSelect(properties: PageProperties, name: string): string {
  const property = getProperty(properties, name);
  if (property.type !== "select") {
    throw new Error(`Notion 속성 타입이 select가 아닙니다: ${name}`);
  }
  const select = property.select;
  if (!select) {
    throw new Error(`Notion 필수 select 속성이 비어 있습니다: ${name}`);
  }
  return select.name;
}

function extractNumber(properties: PageProperties, name: string): number {
  const property = getProperty(properties, name);
  if (property.type !== "number") {
    throw new Error(`Notion 속성 타입이 number가 아닙니다: ${name}`);
  }
  return property.number ?? 0;
}

function extractRelationIds(properties: PageProperties, name: string): string[] {
  const property = getProperty(properties, name);
  if (property.type !== "relation") {
    throw new Error(`Notion 속성 타입이 relation이 아닙니다: ${name}`);
  }
  return property.relation.map((relation) => relation.id);
}

function extractFormulaNumber(properties: PageProperties, name: string): number {
  const property = getProperty(properties, name);
  if (property.type !== "formula") {
    throw new Error(`Notion 속성 타입이 formula가 아닙니다: ${name}`);
  }
  if (property.formula.type !== "number") {
    throw new Error(`Notion formula 속성이 number를 반환하지 않습니다: ${name}`);
  }
  return property.formula.number ?? 0;
}

async function getInvoiceItems(pageId: string): Promise<InvoiceItem[]> {
  const response = await notion.dataSources.query({
    data_source_id: ITEMS_DATA_SOURCE_ID,
    filter: {
      property: "Invoices",
      relation: { contains: pageId },
    },
  });

  return response.results.filter(isFullPage).map((page) => ({
    id: page.id,
    description: extractTitle(page.properties, "description"),
    quantity: extractNumber(page.properties, "quantity"),
    unitPrice: extractNumber(page.properties, "unit_price"),
    amount: extractFormulaNumber(page.properties, "amount"),
  }));
}

export async function getInvoice(pageId: string): Promise<Invoice> {
  if (!isValidNotionPageIdFormat(pageId)) {
    throw new InvoiceNotFoundError(pageId);
  }

  let page;
  try {
    page = await notion.pages.retrieve({ page_id: pageId });
  } catch (error) {
    if (
      APIResponseError.isAPIResponseError(error) &&
      NOT_FOUND_ERROR_CODES.includes(error.code)
    ) {
      throw new InvoiceNotFoundError(pageId);
    }
    throw error;
  }

  if (!isFullPage(page)) {
    throw new Error(`Notion 페이지 전체 정보를 가져올 수 없습니다: ${pageId}`);
  }

  const { properties } = page;
  const itemIds = extractRelationIds(properties, "items");
  const items = itemIds.length > 0 ? await getInvoiceItems(pageId) : [];

  return invoiceSchema.parse({
    id: page.id,
    invoiceNumber: extractTitle(properties, "invoice_number"),
    clientName: extractRichText(properties, "client_name"),
    issueDate: extractDate(properties, "issue_date"),
    validUntil: extractDate(properties, "valid_until"),
    items,
    totalAmount: extractNumber(properties, "total_amount"),
    status: extractSelect(properties, "status"),
  });
}

export { notion };
