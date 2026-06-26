import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
}

export function KpiCard({
  title,
  value,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <p className="mt-2 text-3xl font-bold">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}