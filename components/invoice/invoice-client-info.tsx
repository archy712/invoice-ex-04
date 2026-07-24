import type { Invoice } from "@/types/invoice";

interface InvoiceClientInfoProps {
  invoice: Invoice;
}

// 발행자 정보 — Phase 2(더미 데이터) 기준 하드코딩.
// MVP 범위상 발행자 정보는 노션 데이터베이스에서 직접 관리하며 별도 연동 계획이 없음.
const issuer = {
  name: "노션스튜디오 디자인랩",
  representative: "김민준",
  registrationNumber: "123-45-67890",
  address: "서울특별시 강남구 테헤란로 123, 4층",
  phone: "02-1234-5678",
  email: "hello@notionstudio.design",
};

export function InvoiceClientInfo({ invoice }: InvoiceClientInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
      {/* 발행자 정보 */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground">발행자</p>
        <p className="font-heading font-semibold">{issuer.name}</p>
        <p className="text-muted-foreground">
          대표 {issuer.representative} · 사업자등록번호 {issuer.registrationNumber}
        </p>
        <p className="text-muted-foreground">{issuer.address}</p>
        <p className="text-muted-foreground">
          {issuer.phone} · {issuer.email}
        </p>
      </div>

      {/* 공급받는자(클라이언트) 정보 */}
      <div className="flex flex-col gap-1 sm:items-end sm:text-right">
        <p className="text-xs font-medium text-muted-foreground">공급받는자</p>
        <p className="font-heading font-semibold">{invoice.clientName}</p>
      </div>
    </div>
  );
}
