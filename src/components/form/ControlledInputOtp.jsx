import { Controller } from 'react-hook-form';
import { InputOtp } from '@heroui/input-otp';
import { useFormContext } from './FormProvider';

/**
 * A controlled OTP input component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {number} props.length - Number of OTP digits
 * @param {Object} props.rules - Validation rules for the OTP input
 * @param {Object} props.otpProps - Additional props for the InputOtp component
 */
export function ControlledInputOtp({ name, length = 4, rules = {}, ...otpProps }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <InputOtp
          {...otpProps}
          {...field}
          length={length}
          errorMessage={error?.message}
          isInvalid={!!error}
        />
      )}
    />
  );
}

export default ControlledInputOtp;