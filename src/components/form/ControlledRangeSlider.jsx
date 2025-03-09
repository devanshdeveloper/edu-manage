import { Controller } from 'react-hook-form';
import {Slider} from "@heroui/slider";
import { useFormContext } from './FormProvider';

/**
 * A controlled range slider component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the slider
 * @param {number} props.minValue - Minimum value for the slider
 * @param {number} props.maxValue - Maximum value for the slider
 * @param {number} props.step - Step value for the slider
 * @param {Object} props.formatOptions - Format options for the slider value
 * @param {Object} props.sliderProps - Additional props for the Slider component
 */
export function ControlledRangeSlider({ 
  name, 
  label,
  minValue = 0,
  maxValue = 100,
  step = 1,
  formatOptions,
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
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          formatOptions={formatOptions}
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          isInvalid={!!error}
          className={`max-w-md ${sliderProps.className || ''}`}
        />
      )}
    />
  );
}

export default ControlledRangeSlider;