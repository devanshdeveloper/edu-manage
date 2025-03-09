import { Controller } from "react-hook-form";
import { Input } from "@heroui/input";
import { useFormContext } from "./FormProvider";

/**
 * A controlled input component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the input
 * @param {Object} props.inputProps - Additional props for the Input component
 * @param {string} [props.helperText] - Helper text to display below the input
 */
export function ControlledInput({ name, label, rules, ...inputProps }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <Input
          {...inputProps}
          {...field}
          label={label}
          errorMessage={error?.message}
          isInvalid={!!error}
        />
      )}
    />
  );
}

export default ControlledInput;
