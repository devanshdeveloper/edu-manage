import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { cn } from "../../utils/cn";
import RenderSuspense from "./RenderSuspense";

/**
 * @typedef {Object} FormState
 * @property {Object} formErrors - Form validation errors
 * @property {Function} setValue - Function to set form field values
 * @property {Function} handleSubmit - Form submission handler
 * @property {Function} reset - Function to reset form fields
 */

/**
 * @typedef {Object} MutationState
 * @property {boolean} isLoading - Whether the mutation is in progress
 * @property {Error|null} error - Any error that occurred during mutation
 * @property {boolean} isSuccess - Whether the mutation was successful
 * @property {Function} mutate - Function to trigger the mutation
 */

/**
 * @typedef {Object} QueryState
 * @property {any} data - The query result data
 * @property {boolean} isLoading - Whether the query is loading
 * @property {Error|null} error - Any error that occurred during the query
 */

/**
 * A component that combines form handling with React Query mutations and queries.
 * Provides an integrated solution for form state management and data mutations.
 * 
 * @param {Object} props
 * @param {Object} [props.formOptions={}] - Options for react-hook-form
 * @param {Object} [props.mutationOptions={}] - Options for useMutation hook
 * @param {Object} [props.queryOptions={}] - Options for useQuery hook
 * @param {string} [props.className] - Additional CSS classes
 * @param {function({ formState: FormState, mutationState: MutationState, queryState: QueryState }): JSX.Element} props.children - Render prop function
 * @returns {JSX.Element}
 */
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

/**
 * Usage Example:
 * 
 * ```jsx
 * import FormMutation from './components/common/FormMutation';
 * 
 * const CreateUserForm = () => {
 *   return (
 *     <FormMutation
 *       mutationOptions={{
 *         mutationFn: (data) => fetch('/api/users', {
 *           method: 'POST',
 *           body: JSON.stringify(data)
 *         }).then(res => res.json()),
 *         onSuccess: () => {
 *           // Handle successful submission
 *         }
 *       }}
 *       formOptions={{
 *         defaultValues: {
 *           name: '',
 *           email: ''
 *         }
 *       }}
 *     >
 *       {({ formState, mutationState }) => (
 *         <div className="space-y-4">
 *           <input
 *             {...formState.register('name')}
 *             placeholder="Name"
 *             className="input"
 *           />
 *           <input
 *             {...formState.register('email')}
 *             placeholder="Email"
 *             className="input"
 *           />
 *           <button
 *             type="submit"
 *             disabled={mutationState.isLoading}
 *           >
 *             {mutationState.isLoading ? 'Saving...' : 'Save'}
 *           </button>
 *         </div>
 *       )}
 *     </FormMutation>
 *   );
 * };
 * ```
 */
