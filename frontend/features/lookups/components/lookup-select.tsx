import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { LookupItem } from "../types";

interface LookupSelectProps {
  placeholder: string;
  items: LookupItem[];
  loading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function LookupSelect({
  placeholder,
  items = [],
}: LookupSelectProps) {
  return (
    <Select
      onValueChange={(v) => {
        alert(v);
        console.log("Selected:", v);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.code} - {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}