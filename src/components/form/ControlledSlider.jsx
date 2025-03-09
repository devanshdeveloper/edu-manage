import { Controller } from 'react-hook-form';
import {Slider} from "@heroui/slider";
import { useFormContext } from './FormProvider';

/**
 * A controlled slider component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the slider
 * @param {React.ReactNode} props.startContent - Content to display at the start of the slider
 * @param {React.ReactNode} props.endContent - Content to display at the end of the slider
 * @param {Object} props.sliderProps - Additional props for the Slider component
 */
export function ControlledSlider({ 
  name, 
  label,
  startContent,
  endContent,
  ...sliderProps 
}) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Slider
          {...sliderProps}
          label={label}
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          isInvalid={!!error}
          startContent={startContent}
          endContent={endContent}
          className={`max-w-md ${sliderProps.className || ''}`}
        />
      )}
    />
  );
}

export default ControlledSlider;