"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "1월", visitors: 3200, signups: 420 },
  { month: "2월", visitors: 3800, signups: 510 },
  { month: "3월", visitors: 4100, signups: 480 },
  { month: "4월", visitors: 3900, signups: 560 },
  { month: "5월", visitors: 4600, signups: 610 },
  { month: "6월", visitors: 5200, signups: 690 },
]

const chartConfig = {
  visitors: {
    label: "방문자",
    color: "var(--chart-1)",
  },
  signups: {
    label: "가입자",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function DashboardChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>방문자 / 가입자 추이</CardTitle>
        <CardDescription>최근 6개월</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
            <Bar dataKey="signups" fill="var(--color-signups)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
