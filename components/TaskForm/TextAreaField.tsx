// Reusable TextareaField Component

import { InputFieldProps } from "@/app/types";
import { Label } from "@/components/ui/label";
const TextareaField: React.FC<InputFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
}) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className="block w-full mb-2 p-2 border rounded"
    />
    {error && touched && <span className="text-red-500">{error}</span>}
  </div>
);

export default TextareaField;
