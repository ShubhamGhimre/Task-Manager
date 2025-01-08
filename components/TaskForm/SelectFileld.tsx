import { TaskStatus } from "@/app/types";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
// Reusable SelectField Component
const SelectField: React.FC<{
    label: string;
    value: TaskStatus;
    onValueChange: (value: TaskStatus) => void;
  }> = ({ label, value, onValueChange }) => (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          {
            Object.values(TaskStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );

  export default SelectField;