import { Controller } from "react-hook-form";
import { RadioGroup } from "@heroui/radio";
import { useFormContext } from "./FormProvider";

/**
 * A controlled radio group component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the radio group
 * @param {React.ReactNode} props.children - Radio components
 * @param {Object} props.radioGroupProps - Additional props for the RadioGroup component
 */
export function ControlledRadioGroup({
  name,
  label,
  children,
  ...radioGroupProps
}) {
  const { control , formState: { errors }} = useFormContext();
  const error = errors[name];
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...props } }) => (
        <RadioGroup
        {...props}
        {...radioGroupProps}
          label={label}
          value={value}
          onValueChange={onChange}
          errorMessage={error?.message}
        >
          {children}
        </RadioGroup>
      )}
    />
  );
}

export default ControlledRadioGroup;
