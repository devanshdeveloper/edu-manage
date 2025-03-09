import { Controller } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";
import { useFormContext } from "./FormProvider";

/**
 * A controlled autocomplete component that integrates with React Hook Form
 * @param {Object} props
 * @param {string} props.name - Field name for the form
 * @param {string} props.label - Label text for the autocomplete
 * @param {Array} props.items - Items to display in the autocomplete
 * @param {Function} props.children - Render function for autocomplete items
 * @param {Object} props.autocompleteProps - Additional props for the Autocomplete component
 */
function ControlledAutocomplete({
  name,
  label,
  items = [],
  children,
  ...autocompleteProps
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          {...autocompleteProps}
          label={label}
          defaultItems={items}
          selectedKey={value}
          onSelectionChange={onChange}
          errorMessage={error?.message}
          isInvalid={!!error}
        >
          {children}
        </Autocomplete>
      )}
    />
  );
}

export default ControlledAutocomplete;
