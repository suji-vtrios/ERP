import {
  Briefcase,
  Building2,
  Users,
  Wallet,
} from "lucide-react";

import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/dashboard/stat-card";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Suji"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Employees"
          value={148}
          description="Active Employees"
          trend={4.8}
          icon={<Users className="h-5 w-5 text-primary" />}
        />

        <StatCard
          title="Projects"
          value={23}
          description="Running Projects"
          trend={8.4}
          icon={<Briefcase className="h-5 w-5 text-primary" />}
        />

        <StatCard
          title="Monthly Payroll"
          value="AED 1.25M"
          description="Current Month"
          trend={2.3}
          icon={<Wallet className="h-5 w-5 text-primary" />}
        />

        <StatCard
          title="Assets"
          value={376}
          description="Assigned Assets"
          trend={-1.2}
          icon={<Building2 className="h-5 w-5 text-primary" />}
        />
      </div>
    </PageContainer>
  );
}