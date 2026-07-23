import {
  Database,
  Download,
  FileSearch,
  FileText,
  Link2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const coreFeatures = [
  {
    id: "F001",
    icon: Database,
    title: "노션 데이터베이스 연동",
    description: "Notion API를 통해 견적서 데이터를 실시간으로 조회합니다.",
  },
  {
    id: "F002",
    icon: FileSearch,
    title: "견적서 조회",
    description: "고유 URL로 접속하면 견적서 내용을 바로 확인할 수 있습니다.",
  },
  {
    id: "F003",
    icon: Download,
    title: "PDF 다운로드",
    description: "견적서를 PDF 파일로 변환해 저장하거나 인쇄할 수 있습니다.",
  },
];

const supportFeatures = [
  {
    id: "F010",
    icon: Link2,
    title: "견적서 URL 생성",
    description: "노션 페이지 ID를 기반으로 고유 URL이 자동으로 생성됩니다.",
  },
  {
    id: "F011",
    icon: ShieldCheck,
    title: "견적서 유효성 검증",
    description: "존재하지 않는 견적서 ID로 접근하면 404 에러가 표시됩니다.",
  },
  {
    id: "F012",
    icon: Smartphone,
    title: "반응형 레이아웃",
    description: "모바일, 태블릿, 데스크톱 등 모든 디바이스를 지원합니다.",
  },
];

const journeySteps = {
  writer: [
    "노션 데이터베이스에 견적서 정보 입력",
    "노션에서 견적서 작성 완료 → 고유 URL 자동 생성",
    "클라이언트에게 이메일/메신저로 링크 전달",
  ],
  client: [
    "이메일/메신저에서 링크 클릭 → 고유 견적서 URL 접속",
    "견적서 조회 페이지에서 내용 확인",
    "PDF 다운로드 버튼 클릭 → 파일 저장/인쇄",
  ],
};

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-16 sm:px-6">
      <section className="flex flex-col items-center gap-4 text-center">
        <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="text-2xl font-semibold tracking-tight">견적서 시스템</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          노션을 데이터베이스로 활용해 견적서를 관리하고, 클라이언트는 고유
          링크로 견적서를 조회하고 PDF로 다운로드할 수 있습니다.
          <br />
          이메일 또는 메신저로 전달받은 고유 링크로 접속하세요.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-center text-lg font-semibold tracking-tight">
          이용 흐름
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>견적서 작성자</CardTitle>
              <CardDescription>노션에서 견적서를 작성하고 전달합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-3">
                {journeySteps.writer.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>클라이언트</CardTitle>
              <CardDescription>견적서를 조회하고 PDF로 저장합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-3">
                {journeySteps.client.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-center text-lg font-semibold tracking-tight">
          핵심 기능
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {coreFeatures.map(({ id, icon: Icon, title, description }) => (
            <Card key={id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <Badge variant="outline">{id}</Badge>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-center text-lg font-semibold tracking-tight">
          지원 기능
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {supportFeatures.map(({ id, icon: Icon, title, description }) => (
            <Card key={id} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  <Badge variant="secondary">{id}</Badge>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
