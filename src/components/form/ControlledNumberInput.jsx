import { Controller } from 'react-hook-form';
import { useFormContext } from './FormProvider';
import {NumberInput} from "@heroui/number-input";
/**
 * A controlled number input component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the input
 * @param {Object} props.inputProps - Additional props for the Input component
 */
export function ControlledNumberInput({ name, label, ...inputProps }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <NumberInput
          {...inputProps}
          label={label}
          value={value}
          onValueChange={onChange}
          errorMessage={error?.message}
          isInvalid={!!error}
        />
      )}
    />
  );
}

export default ControlledNumberInput;