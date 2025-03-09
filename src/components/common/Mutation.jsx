import { useMutation } from "@tanstack/react-query";

/**
 * @typedef {Object} MutationState
 * @property {boolean} isLoading - Whether the mutation is in progress
 * @property {Error|null} error - Any error that occurred during mutation
 * @property {boolean} isSuccess - Whether the mutation was successful
 * @property {Function} mutate - Function to trigger the mutation
 * @property {Function} reset - Function to reset mutation state
 */

/**
 * A component that wraps React Query's useMutation hook and provides a render prop interface
 * for handling data mutations.
 * 
 * @param {Object} props
 * @param {Object} props.mutationOptions - Options for useMutation hook
 * @param {function(any): Promise<any>} props.mutationOptions.mutationFn - Function that performs the mutation
 * @param {function(any, any): void} [props.mutationOptions.onSuccess] - Called when mutation succeeds
 * @param {function(Error, any, any): void} [props.mutationOptions.onError] - Called when mutation fails
 * @param {function(MutationState): JSX.Element} props.children - Render prop function that receives mutation state
 * @returns {JSX.Element}
 */
const Mutation = ({ children, ...mutationOptions }) => {
  const mutationState = useMutation(mutationOptions);

  // Ensure children is a function
  if (typeof children !== "function") {
    throw new Error("The children of <Mutation> must be a function.");
  }

  return <>{children(mutationState)}</>;
};

export default Mutation;

/**
 * Usage Example:
 * 
 * ```jsx
 * import Mutation from './components/common/Mutation';
 * 
 * const DeleteUserButton = ({ userId }) => {
 *   return (
 *     <Mutation
 *       mutationFn={(id) => fetch(`/api/users/${id}`, {
 *         method: 'DELETE'
 *       }).then(res => res.json())}
 *       onSuccess={() => {
 *         // Handle successful deletion
 *         console.log('User deleted successfully');
 *       }}
 *       onError={(error) => {
 *         // Handle error
 *         console.error('Failed to delete user:', error);
 *       }}
 *     >
 *       {({ isLoading, mutate }) => (
 *         <button
 *           onClick={() => mutate(userId)}
 *           disabled={isLoading}
 *           className="btn btn-danger"
 *         >
 *           {isLoading ? 'Deleting...' : 'Delete User'}
 *         </button>
 *       )}
 *     </Mutation>
 *   );
 * };
 * ```
 */
