"use client"

import { useState } from "react"
import { LayoutGrid, TableIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type UserStatus = "active" | "invited" | "suspended"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  joinedAt: string
}

const users: User[] = [
  { id: "1", name: "김민수", email: "minsu.kim@example.com", role: "Admin", status: "active", joinedAt: "2025-01-12" },
  { id: "2", name: "이지우", email: "jiwoo.lee@example.com", role: "Editor", status: "active", joinedAt: "2025-02-03" },
  { id: "3", name: "박서연", email: "seoyeon.park@example.com", role: "Viewer", status: "invited", joinedAt: "2025-03-21" },
  { id: "4", name: "최도윤", email: "doyoon.choi@example.com", role: "Editor", status: "active", joinedAt: "2025-04-09" },
  { id: "5", name: "정하은", email: "haeun.jung@example.com", role: "Viewer", status: "suspended", joinedAt: "2025-05-17" },
  { id: "6", name: "강시우", email: "siwoo.kang@example.com", role: "Admin", status: "active", joinedAt: "2025-06-02" },
]

const statusLabel: Record<UserStatus, string> = {
  active: "활성",
  invited: "초대됨",
  suspended: "정지됨",
}

const statusVariant: Record<UserStatus, "default" | "secondary" | "destructive"> = {
  active: "default",
  invited: "secondary",
  suspended: "destructive",
}

function initials(name: string) {
  return name.slice(0, 1)
}

export function UserTable() {
  const [view, setView] = useState<"table" | "list">("table")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-1 rounded-lg bg-muted p-1 w-fit ml-auto">
        <Button
          size="sm"
          variant="ghost"
          className={cn(view === "table" && "bg-background shadow-sm")}
          onClick={() => setView("table")}
        >
          <TableIcon className="size-4" />
          Table
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className={cn(view === "list" && "bg-background shadow-sm")}
          onClick={() => setView("list")}
        >
          <LayoutGrid className="size-4" />
          Card List
        </Button>
      </div>

      {view === "table" ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사용자</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback>{initials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[user.status]}>
                    {statusLabel[user.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{initials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant={statusVariant[user.status]}>
                  {statusLabel[user.status]}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
