import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export function EmployeeStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "ACTIVE":
      return <Badge>Active</Badge>;

    case "PROBATION":
      return <Badge variant="secondary">Probation</Badge>;

    case "NOTICE":
      return <Badge variant="outline">Notice</Badge>;

    case "TERMINATED":
      return <Badge variant="destructive">Terminated</Badge>;

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}