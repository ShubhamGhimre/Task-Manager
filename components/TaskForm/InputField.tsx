import { InputFieldProps } from "@/app/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


// Reusable InputField Component
const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
  touched,
}) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
    />
    {error && touched && <span className="text-red-500">{error}</span>}
  </div>
);

export default InputField;
