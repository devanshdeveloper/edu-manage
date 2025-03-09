import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

const FormContext = createContext();

/**
 * FormProvider component that provides form context to child components
 * @param {Object} props
 * @param {Object} props.defaultValues - Default values for the form
 * @param {Object} props.queryOptions - React Query options for fetching initial data
 * @param {Object} props.formOptions - Additional options for useForm hook
 * @param {React.ReactNode} props.children - Child components
 */
export  function FormProvider({
  defaultValues = {},
  queryOptions,
  formOptions = {},
  children,
  onSubmit,
  className,
}) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    defaultValues,
    ...formOptions,
  });

  // Fetch initial data if queryOptions is provided
  const { data, isLoading, error } = useQuery({
    ...queryOptions,
    enabled: !!queryOptions,
    onSuccess: (data) => {
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          setValue(key, value);
        });
      }
    },
  });

  const contextValue = {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      isValid,
    },
    queryState: {
      data,
      isLoading,
      error,
    },
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default FormProvider;

/**
 * Custom hook to access form context
 * @returns {Object} Form context value
 */
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
