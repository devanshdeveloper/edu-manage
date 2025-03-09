import { Button } from "@heroui/button";
import { useFormContext } from "./FormProvider";

/**
 * A controlled submit button component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.children - Button text or content
 * @param {boolean} props.isLoading - Loading state of the form submission
 * @param {Object} props.buttonProps - Additional props for the Button component
 */
export function ControlledSubmit({
  children,
  isLoading = false,
  ...buttonProps
}) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  return (
    <Button
      {...buttonProps}
      type="submit"
      isLoading={isLoading || isSubmitting}
      isDisabled={isSubmitting || isLoading}
    >
      {children}
    </Button>
  );
}

export default ControlledSubmit;
