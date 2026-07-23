import { ShowcaseSection } from "@/components/gallery/showcase-section"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const previewRows = [
  { name: "김민수", role: "Admin", status: "Active" },
  { name: "이지우", role: "Editor", status: "Active" },
  { name: "박서연", role: "Viewer", status: "Invited" },
]

export function DataDisplayShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ShowcaseSection title="Card">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>월간 방문자</CardTitle>
            <CardDescription>지난 30일간 집계</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">12,480</p>
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Avatar">
        <Avatar>
          <AvatarFallback>KM</AvatarFallback>
        </Avatar>
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Table" description="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion">
        <Accordion className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>스타터킷은 어떤 스택인가요?</AccordionTrigger>
            <AccordionContent>
              Next.js, TypeScript, TailwindCSS, shadcn/ui(Base UI) 조합입니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>다크 모드를 지원하나요?</AccordionTrigger>
            <AccordionContent>
              next-themes를 통해 시스템 테마 감지와 수동 전환을 지원합니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>

      <ShowcaseSection title="Scroll Area">
        <ScrollArea className="h-32 w-full rounded-md border border-border p-3">
          <div className="space-y-2 text-sm text-muted-foreground">
            {Array.from({ length: 10 }, (_, i) => (
              <p key={i}>스크롤 가능한 콘텐츠 라인 {i + 1}</p>
            ))}
          </div>
        </ScrollArea>
      </ShowcaseSection>
    </div>
  )
}
