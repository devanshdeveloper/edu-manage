import { Controller } from 'react-hook-form';
import { DatePicker } from '@heroui/date-picker';
import { useFormContext } from './FormProvider';

/**
 * A controlled date picker component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the date picker
 * @param {Object} props.datePickerProps - Additional props for the DatePicker component
 */
export function ControlledDatePicker({ name, label, ...datePickerProps }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <DatePicker
          {...datePickerProps}
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

export default ControlledDatePicker;