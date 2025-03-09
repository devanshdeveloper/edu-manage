import { Controller } from 'react-hook-form';
import { RangeCalendar } from '@heroui/calendar';
import { useFormContext } from './FormProvider';

/**
 * A controlled range calendar component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the calendar
 * @param {Object} props.calendarProps - Additional props for the RangeCalendar component
 */
export function ControlledRangeCalendar({ name, label, ...calendarProps }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <RangeCalendar
          {...calendarProps}
          aria-label={label}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
}

export default ControlledRangeCalendar;