"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

        <TabsTrigger value="documents">
          Documents
        </TabsTrigger>

        <TabsTrigger value="assets">
          Assets
        </TabsTrigger>

        <TabsTrigger value="leave">
          Leave
        </TabsTrigger>

        <TabsTrigger value="payroll">
          Payroll
        </TabsTrigger>

        <TabsTrigger value="timeline">
          Timeline
        </TabsTrigger>
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