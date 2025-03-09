import { Select, SelectSection, SelectItem } from "@heroui/select";

import { Controller } from "react-hook-form";
import { useFormContext } from "./FormProvider";

/**
 * A controlled select component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the select
 * @param {React.ReactNode} props.children - Select items
 * @param {Object} props.selectProps - Additional props for the Select component
 * @param {string} [props.helperText] - Helper text to display below the select
 */
export function ControlledSelect({
  name,
  label,
  variant = "faded",
  options,
  errorMessage,
  ...selectProps
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...selectProps}
          {...field}
          label={label}
          errorMessage={errorMessage || error?.message}
          isInvalid={!!error}
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}

export default ControlledSelect;
