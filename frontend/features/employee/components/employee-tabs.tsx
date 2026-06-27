"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CalendarDays,
  FileText,
  Laptop,
  Wallet,
  History,
} from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";

interface EmployeeTabsProps {
  overview: React.ReactNode;
}

export function EmployeeTabs({
  overview,
}: EmployeeTabsProps) {
  return (
    <Tabs
      defaultValue="overview"
      className="space-y-6"
    >
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>

        <TabsContent value="documents">
        <EmptyState
            icon={FileText}
            title="No Documents"
            description="No documents have been uploaded for this employee."
            actionLabel="Upload Document"
        />
        </TabsContent>

        <TabsContent value="assets">
        <EmptyState
            icon={Laptop}
            title="No Assets"
            description="No assets have been assigned to this employee."
            actionLabel="Assign Asset"
        />
        </TabsContent>

        <TabsContent value="leave">
        <EmptyState
            icon={CalendarDays}
            title="No Leave Records"
            description="Leave requests and balances will appear here."
            actionLabel="Request Leave"
        />
        </TabsContent>

        <TabsContent value="payroll">
        <EmptyState
            icon={Wallet}
            title="No Payroll Records"
            description="Payroll history will appear here."
        />
        </TabsContent>

        <TabsContent value="timeline">
        <EmptyState
            icon={History}
            title="No Timeline"
            description="Employee activity will appear here."
        />
        </TabsContent>
      </TabsList>

      <TabsContent value="overview">
        {overview}
      </TabsContent>

      <TabsContent value="documents">
        <div className="text-muted-foreground">
          Documents module coming soon.
        </div>
      </TabsContent>

      <TabsContent value="assets">
        <div className="text-muted-foreground">
          Assets module coming soon.
        </div>
      </TabsContent>

      <TabsContent value="leave">
        <div className="text-muted-foreground">
          Leave module coming soon.
        </div>
      </TabsContent>

      <TabsContent value="payroll">
        <div className="text-muted-foreground">
          Payroll module coming soon.
        </div>
      </TabsContent>

      <TabsContent value="timeline">
        <div className="text-muted-foreground">
          Timeline module coming soon.
        </div>
      </TabsContent>
    </Tabs>
  );
}