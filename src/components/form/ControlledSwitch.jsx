import { Controller } from 'react-hook-form';
import { Switch } from '@heroui/switch';
import { useFormContext } from './FormProvider';

/**
 * A controlled switch component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the switch
 * @param {Object} props.switchProps - Additional props for the Switch component
 */
export function ControlledSwitch({ name, label, ...switchProps }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Switch
          {...switchProps}
          isSelected={value}
          onValueChange={onChange}
        >
          {label}
        </Switch>
      )}
    />
  );
}

export default ControlledSwitch;