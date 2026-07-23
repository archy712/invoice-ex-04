import type { Metadata } from "next";
import { CreditCard, DollarSign, ShoppingCart, Users } from "lucide-react";

import { StatCard } from "@/components/examples/stat-card";
import { DashboardChart } from "@/components/examples/dashboard-chart";
import { UserTable } from "@/components/examples/user-table";

export const metadata: Metadata = {
  title: "대시보드",
  description: "Sidebar 레이아웃, 차트, 테이블을 포함한 대시보드 예제",
};

const stats = [
  { title: "총 매출", value: "₩84,320,000", change: "+12.4% 전월 대비", trend: "up" as const, icon: DollarSign },
  { title: "신규 가입자", value: "1,204", change: "+8.1% 전월 대비", trend: "up" as const, icon: Users },
  { title: "주문 수", value: "3,842", change: "-2.3% 전월 대비", trend: "down" as const, icon: ShoppingCart },
  { title: "결제 실패율", value: "1.2%", change: "-0.4%p 전월 대비", trend: "up" as const, icon: CreditCard },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">개요</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          최근 지표와 사용자 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <DashboardChart />

      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">최근 사용자</h2>
        <UserTable />
      </div>
    </div>
  );
}
