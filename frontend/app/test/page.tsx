"use client";

import { useForm, Controller } from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type FormData = {
  company: string;
};

export default function TestPage() {
  const form = useForm<FormData>({
    defaultValues: {
      company: "",
    },
  });

  const company = form.watch("company");

  return (
    <div className="max-w-md p-10 space-y-6">

      <h1 className="text-2xl font-bold">
        Select Test
      </h1>

      <Controller
        control={form.control}
        name="company"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">
                BIM Group
              </SelectItem>

              <SelectItem value="2">
                Architecture
              </SelectItem>

              <SelectItem value="3">
                Engineering
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <div className="border rounded p-4">
        <strong>Selected Value:</strong>

        <br />

        {company || "(empty)"}
      </div>

    </div>
  );
}