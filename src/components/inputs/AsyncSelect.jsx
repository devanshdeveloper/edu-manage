import { useQuery } from "@tanstack/react-query";
import { Select, SelectItem } from "@heroui/select";

/**
 * A reusable async select component that integrates with React Query for data fetching.
 * All HeroUI Select props are supported through selectProps spreading.
 * 
 * @typedef {Object} AsyncSelectProps
 * @property {Object} queryOptions - React Query options object
 * @property {string[]} queryOptions.queryKey - React Query key for caching
 * @property {() => Promise<any>} queryOptions.queryFn - Function to fetch options data
 * @property {string} [labelKey='label'] - Key to use for option labels in the data array
 * @property {string} [valueKey='value'] - Key to use for option values in the data array
 * @property {Object} [selectProps] - Props passed directly to HeroUI Select component
 * @property {string} [selectProps.label] - Label for the select input
 * @property {string} [selectProps.placeholder] - Placeholder text
 * @property {function} [selectProps.onSelectionChange] - Callback when selection changes
 * @property {any} [selectProps.selectedValue] - Currently selected value
 * @property {boolean} [selectProps.isDisabled] - Whether the select is disabled
 * @property {string} [selectProps.size] - Size of the select component ('sm' | 'md' | 'lg')
 * @property {string} [selectProps.variant] - Visual variant ('bordered' | 'flat' | 'faded')
 * @property {string} [selectProps.color] - Color theme of the select
 * @property {string} [selectProps.className] - Additional CSS classes
 */
export function AsyncSelect({
  queryOptions,
  labelKey = "label",
  valueKey = "value",
  value,
  onChange,
  ...selectProps
}) {
  const { data, isLoading, error } = useQuery(queryOptions);

  const options = data || [];


  console.log(options)



  return (
    <Select
      {...selectProps}
      // isLoading={isLoading}
      // errorMessage={error?.message}
      onSelectionChange={onChange}
      selectedKeys={value}
    >
      {options.map((option) => (
        <SelectItem key={option[valueKey]}>
          {option[labelKey]}
        </SelectItem>
      ))}
    </Select>
  );
}

export default AsyncSelect;

/* Usage Example:

function DepartmentSelect({ onDepartmentChange, isDisabled }) {
  return (
    <AsyncSelect
      queryOptions={{
        queryKey: ["departments"],
        queryFn: () => fetch("/api/departments").then((res) => res.json())
      }}
      labelKey="name"
      valueKey="id"
      selectProps={{
        // Basic props
        label: "Department",
        placeholder: "Select a department",
        selectedValue: undefined,

        // Event handlers
        onSelectionChange: onDepartmentChange,
        onBlur: () => console.log("Select blurred"),
        onFocus: () => console.log("Select focused"),

        // Visual customization
        variant: "bordered",
        size: "md",
        color: "primary",
        className: "w-full max-w-xs",
        isDisabled: isDisabled,

        // Accessibility
        aria-label: "Department selection",
        "aria-describedby": "department-help-text"
      }}
    />
  );
}

// Advanced usage with validation and loading states
function AdvancedDepartmentSelect() {
  const [selectedDept, setSelectedDept] = useState(null);
  
  return (
    <div className="space-y-2">
      <AsyncSelect
        queryOptions={{
          queryKey: ["departments"],
          queryFn: () => fetch("/api/departments").then((res) => res.json()),
          // Additional React Query options
          staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
          cacheTime: 10 * 60 * 1000 // Cache persists for 10 minutes
        }}
        labelKey="name"
        valueKey="id"
        selectProps={{
          label: "Department",
          selectedValue: selectedDept,
          onSelectionChange: setSelectedDept,
          // Enhanced styling
          variant: "bordered",
          color: selectedDept ? "success" : "primary",
          className: "w-full",
          // Validation
          isRequired: true,
          errorMessage: !selectedDept && "Please select a department"
        }}
      />
      {selectedDept && (
        <p className="text-sm text-green-600">
          Selected department ID: {selectedDept}
        </p>
      )}
    </div>
  );
}
*/
