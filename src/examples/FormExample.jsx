import {
  FormProvider,
  ControlledInput,
  ControlledSelect,
  ControlledCheckbox,
  ControlledSubmit,
  ControlledAutocomplete,
  ControlledCheckboxGroup,
  ControlledDateInput,
  ControlledInputOtp,
  ControlledNumberInput,
  ControlledRadioGroup,
  ControlledRangeCalendar,
  ControlledRangeSlider,
  ControlledSlider,
  ControlledSwitch,
} from "../components/form";
import { SelectItem } from "@heroui/select";
import { AutocompleteItem } from "@heroui/autocomplete";
import { Checkbox } from "@heroui/checkbox";
import { Radio } from "@heroui/radio";
import ControlledAsyncSelect from "../components/form/ControlledAsyncSelect";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  department: "",
  permissions: [],
  birthDate: "",
  startDate: "",
  agreeToTerms: false,
  verificationCode: "",
  age: 18,
  gender: "other",
  availabilityRange: null,
  experienceRange: [2, 8],
  satisfaction: 50,
  notifications: false,
};

const roles = [
  { label: "Student", value: "student" },
  { label: "Teacher", value: "teacher" },
  { label: "Administrator", value: "admin" },
];

const departments = [
  { label: "Computer Science", value: "cs" },
  { label: "Mathematics", value: "math" },
  { label: "Physics", value: "physics" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Biology", value: "biology" },
];

const permissions = [
  { label: "View Courses", value: "view_courses" },
  { label: "Edit Courses", value: "edit_courses" },
  { label: "View Grades", value: "view_grades" },
  { label: "Edit Grades", value: "edit_grades" },
];

export function FormExample() {
  const handleSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider
      defaultValues={defaultValues}
      formOptions={{
        mode: "onChange",
        reValidateMode: "onChange",
      }}
      className="space-y-4 max-w-md mx-auto p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">User Registration</h2>
      {/* TextInput Example */}
      <ControlledInput
        name="firstName"
        label="First Name"
        rules={{
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        }}
      />
      {/* Email Input Example */}
      <ControlledInput
        name="email"
        label="Email"
        type="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />
      {/* Basic Select Input Example */}
      <ControlledSelect
        name="role"
        label="Primary Role"
        rules={{ required: "Please select a role" }}
        options={roles}
      />

      {/* Aysnc Select Input Example */}
      <ControlledAsyncSelect
        name="role"
        label="Primary Role"
        rules={{ required: "Please select a role" }}
        queryOptions={{
          queryKey: ["roles"],
          queryFn: () => fetch("/api/roles").then((res) => res.json()),
        }}
      />

      <ControlledAutocomplete
        name="department"
        label="Department"
        items={departments}
        rules={{ required: "Please select a department" }}
      >
        {(item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </ControlledAutocomplete>

      <ControlledCheckboxGroup
        name="permissions"
        label="Permissions"
        rules={{ required: "Please select at least one permission" }}
      >
        {permissions.map((permission) => (
          <Checkbox key={permission.value} value={permission.value}>
            {permission.label}
          </Checkbox>
        ))}
      </ControlledCheckboxGroup>

      <ControlledInputOtp
        name="verificationCode"
        length={6}
        rules={{ required: "Verification code is required" }}
      />

      <ControlledNumberInput
        name="age"
        label="Age"
        rules={{
          required: "Age is required",
          min: { value: 18, message: "Must be at least 18 years old" },
          max: { value: 100, message: "Must be under 100 years old" },
        }}
      />

      <ControlledRadioGroup
        name="gender"
        label="Gender"
        rules={{ required: "Please select a gender" }}
      >
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
        <Radio value="other">Other</Radio>
      </ControlledRadioGroup>

      <ControlledRangeCalendar
        name="availabilityRange"
        label="Availability Range"
        rules={{ required: "Please select your availability range" }}
      />

      {/* 
      <ControlledDateInput
        name="birthDate"
        label="Birth Date"
        rules={{ required: "Birth date is required" }}
      />

      <ControlledDateInput
        name="startDate"
        label="Start Date"
        rules={{ required: "Start date is required" }}
      />

      */}
      <ControlledRangeSlider
        name="experienceRange"
        label="Years of Experience"
        minValue={0}
        maxValue={20}
        step={1}
        formatOptions={{ style: "unit", unit: "year" }}
        rules={{ required: "Please specify your experience range" }}
      />

      <ControlledSlider
        name="satisfaction"
        label="Satisfaction Level"
        minValue={0}
        maxValue={100}
        step={10}
        startContent="😢"
        endContent="😊"
        rules={{ required: "Please indicate your satisfaction level" }}
      />

      <ControlledSwitch name="notifications" label="Enable Notifications" />

      <ControlledCheckbox
        name="agreeToTerms"
        label="I agree to the terms and conditions"
        rules={{
          required: "You must agree to the terms",
        }}
        validate={(value) => value === true || "You must agree to the terms"}
      />
      <div className="mt-6">
        <ControlledSubmit color="primary">Register</ControlledSubmit>
      </div>
    </FormProvider>
  );
}

export default FormExample;
