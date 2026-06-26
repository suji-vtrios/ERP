import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({
  title,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        {title}
      </h3>

      {children}
    </section>
  );
}