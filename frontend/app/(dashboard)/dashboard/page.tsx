import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { PageSection } from "@/components/common/page-section";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Welcome to Group ERP"
      />

      <PageSection title="Overview">
        Dashboard widgets will be added here.
      </PageSection>
    </PageContainer>
  );
}