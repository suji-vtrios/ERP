import { Button } from "@/components/ui/button";

import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { PageSection } from "@/components/common/page-section";
import { PageToolbar } from "@/components/common/page-toolbar";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Welcome to Group ERP"
        actions={<Button>Refresh</Button>}
      />

      <PageToolbar>
        <div className="text-sm text-muted-foreground">
          Enterprise Resource Planning Platform
        </div>
      </PageToolbar>

      <PageSection title="Overview">
        Dashboard widgets will appear here.
      </PageSection>
    </PageContainer>
  );
}