import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs",
            trend === "up" ? "text-primary" : "text-destructive"
          )}
        >
          {trend === "up" ? (
            <TrendingUp className="size-3.5" />
          ) : (
            <TrendingDown className="size-3.5" />
          )}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
