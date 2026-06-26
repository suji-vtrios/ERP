"use client";

import type { LookupItem } from "@/features/lookups/types/lookup";

type LookupSelectProps = {
  value: string;
  onChange: (value: string) => void;
  items: LookupItem[];
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
};

export function LookupSelect({
  value,
  onChange,
  items,
  placeholder = "Select",
  loading = false,
  disabled = false,
}: LookupSelectProps) {
  return (
    <select
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || loading}
    >
      <option value="">
        {loading ? "Loading..." : placeholder}
      </option>

      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.code ? `${item.code} - ${item.name}` : item.name}
        </option>
      ))}
    </select>
  );
}