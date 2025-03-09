import { Controller } from 'react-hook-form';
import { CheckboxGroup } from '@heroui/checkbox';
import { useFormContext } from './FormProvider';

/**
 * A controlled checkbox group component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the checkbox group
 * @param {React.ReactNode} props.children - Checkbox components
 * @param {Object} props.checkboxGroupProps - Additional props for the CheckboxGroup component
 */
 function ControlledCheckboxGroup({ name, label, children, ...checkboxGroupProps }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <CheckboxGroup
          {...checkboxGroupProps}
          label={label}
          value={value}
          onValueChange={onChange}
          errorMessage={error?.message}
          isInvalid={!!error}
        >
          {children}
        </CheckboxGroup>
      )}
    />
  );
}

export default ControlledCheckboxGroup;