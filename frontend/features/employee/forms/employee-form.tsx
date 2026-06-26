"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";

export function EmployeeForm() {
  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <FormSection title="Personal Information">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <RequiredLabel required>  Employee Code</RequiredLabel>
            <Input placeholder="Enter Employee Code" />
          </div>

          <div className="space-y-2">
            <RequiredLabel required>First Name</RequiredLabel>
            <Input placeholder="Enter First Name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input placeholder="Enter Last Name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="Enter Email Address"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mobile</label>
            <Input
              type="tel"
              placeholder="Enter Mobile Number"
            />
          </div>
        </div>
      </FormSection>

      {/* Organization */}
      <FormSection title="Organization">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <RequiredLabel>Company</RequiredLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <RequiredLabel>Branch</RequiredLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <RequiredLabel>Department</RequiredLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Designation
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">
              Reporting Manager
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Reporting Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      {/* Employment */}
      <FormSection title="Employment">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Joining Date
            </label>
            <Input type="date" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Employee Type
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Employee Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERMANENT">
                  Permanent
                </SelectItem>
                <SelectItem value="CONTRACT">
                  Contract
                </SelectItem>
                <SelectItem value="INTERN">
                  Intern
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <Button variant="outline">
          Cancel
        </Button>

        <Button>
          Create Employee
        </Button>
      </div>
    </div>
  );
}