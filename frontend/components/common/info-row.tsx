interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
}

export function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium text-right">
        {value ?? "-"}
      </span>
    </div>
  );
}