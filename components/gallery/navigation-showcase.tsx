"use client"

import { ShowcaseSection } from "@/components/gallery/showcase-section"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { ChevronDown } from "lucide-react"

export function NavigationShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ShowcaseSection title="Navigation Menu" description="드롭다운 메가 메뉴">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>제품</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-56 gap-1">
                  <li>
                    <NavigationMenuLink href="/gallery">컴포넌트 갤러리</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/dashboard">대시보드</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ShowcaseSection>

      <ShowcaseSection title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gallery">갤러리</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>컴포넌트</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">계정</TabsTrigger>
            <TabsTrigger value="password">비밀번호</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-2 text-muted-foreground">
            계정 설정을 관리합니다.
          </TabsContent>
          <TabsContent value="password" className="pt-2 text-muted-foreground">
            비밀번호를 변경합니다.
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            메뉴 열기
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSection>

      <ShowcaseSection title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ShowcaseSection>

      <ShowcaseSection title="Command" description="커맨드 팔레트 / 검색">
        <Command className="w-full max-w-72 border border-border">
          <CommandInput placeholder="명령 검색..." />
          <CommandList>
            <CommandEmpty>결과가 없습니다.</CommandEmpty>
            <CommandGroup heading="페이지">
              <CommandItem>홈</CommandItem>
              <CommandItem>컴포넌트 갤러리</CommandItem>
              <CommandItem>대시보드</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ShowcaseSection>
    </div>
  )
}
