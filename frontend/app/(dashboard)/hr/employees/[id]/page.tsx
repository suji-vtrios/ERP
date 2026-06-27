import { EmployeeProfile } from "@/features/employee/components/employee-profile";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmployeeProfilePage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <EmployeeProfile
      employeeId={id}
    />
  );
}