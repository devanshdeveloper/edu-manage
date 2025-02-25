import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { cn } from "../../utils/cn";
import RenderSuspense from "./RenderSuspense";

const FormMutation = ({
  formOptions = {},
  mutationOptions = {},
  queryOptions = {},
  className,
  children,
}) => {
  const formState = useForm(formOptions);

  const mutation = useMutation(mutationOptions);

  const query = useQuery({
    ...queryOptions,
    queryKey: queryOptions?.queryKey || [],
    queryFn: async () => {
      if (!queryOptions?.queryFn) return {};

      try {
        const data = await queryOptions.queryFn();

        if (!data) {
          throw Error("Cannot get Data");
        }
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          const element = keys[i];
          formState.setValue(element, data[element]);
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    formState.reset()
  };

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={formState.handleSubmit(mutation.mutate)}
    >
      {queryOptions?.queryFn && (
        <RenderSuspense
          {...{
            data: [""],
            isLoading: query.isLoading,
            error: query.error,
          }}
        >
          {children({
            formState: { ...formState, formErrors: formState.formState.errors },
            mutationState: mutation,
            queryState: query,
          })}
        </RenderSuspense>
      )}
      {!queryOptions?.queryFn && (
        <>
          {children({
            formState: { ...formState, formErrors: formState.formState.errors },
            mutationState: mutation,
            queryState: query,
          })}
        </>
      )}
    </form>
  );
};

export default FormMutation;
