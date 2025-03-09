import { Controller } from 'react-hook-form';
import { DateRangePicker } from '@heroui/date-picker';
import { useFormContext } from './FormProvider';

/**
 * A controlled date range picker component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the date range picker
 * @param {Object} props.dateRangePickerProps - Additional props for the DateRangePicker component
 */
export function ControlledDateRangePicker({ name, label, ...dateRangePickerProps }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <DateRangePicker
          {...dateRangePickerProps}
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

export default ControlledDateRangePicker;