"use client"

import { ShowcaseSection } from "@/components/gallery/showcase-section"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function OverlayShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ShowcaseSection title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            다이얼로그 열기
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>프로필 수정</DialogTitle>
              <DialogDescription>변경 후 저장을 눌러주세요.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>저장</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowcaseSection>

      <ShowcaseSection title="Alert Dialog">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            삭제하기
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ShowcaseSection>

      <ShowcaseSection title="Sheet">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            시트 열기
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>설정</SheetTitle>
              <SheetDescription>사이드 패널 형태의 오버레이입니다.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </ShowcaseSection>

      <ShowcaseSection title="Popover">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            팝오버 열기
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-muted-foreground">
              트리거 근처에 표시되는 부동 패널입니다.
            </p>
          </PopoverContent>
        </Popover>
      </ShowcaseSection>

      <ShowcaseSection title="Tooltip">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            호버해보세요
          </TooltipTrigger>
          <TooltipContent>도움말 텍스트</TooltipContent>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection title="Hover Card">
        <HoverCard>
          <HoverCardTrigger
            render={<Button variant="link" className="px-0" />}
          >
            @starterkit
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-sm font-medium">Modern Web Starter Kit</p>
            <p className="text-sm text-muted-foreground">
              Next.js와 shadcn/ui로 만든 스타터킷입니다.
            </p>
          </HoverCardContent>
        </HoverCard>
      </ShowcaseSection>
    </div>
  )
}
