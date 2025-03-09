import { Controller } from 'react-hook-form';
import { DateInput } from '@heroui/date-input';
import { useFormContext } from './FormProvider';

/**
 * A controlled date input component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the date input
 * @param {Object} props.dateInputProps - Additional props for the DateInput component
 */
export function ControlledDateInput({ name, label, ...dateInputProps }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <DateInput
          {...dateInputProps}
          label={label}
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          isInvalid={!!error}
        />
      )}
    />
  );
}

export default ControlledDateInput;