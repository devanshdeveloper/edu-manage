import { Controller } from "react-hook-form";
import { useFormContext } from "./FormProvider";
import { Checkbox } from "@heroui/checkbox";
/**
 * A controlled checkbox component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the checkbox
 * @param {Object} props.checkboxProps - Additional props for the Checkbox component
 */
export function ControlledCheckbox({ name, label, rules, ...checkboxProps }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ...props } }) => (
        <div className="flex flex-col gap-2">
          <Checkbox
            defaultSelected={value}
            onChange={onChange}
            isSelected={value}
            {...checkboxProps}
            {...props}
          >
            {label && <span size={14}>{label}</span>}
          </Checkbox>
          {errors[name] && (
            <span className="text-tiny text-danger">{errors[name].message}</span>
          )}
        </div>
      )}
    />
  );
}

export default ControlledCheckbox;
