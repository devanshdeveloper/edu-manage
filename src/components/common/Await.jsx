import { useQuery } from "@tanstack/react-query";

/**
 * @typedef {Object} QueryState
 * @property {any} data - The query result data
 * @property {boolean} isLoading - Whether the query is currently loading
 * @property {Error|null} error - Any error that occurred during the query
 * @property {boolean} isError - Whether the query resulted in an error
 * @property {() => void} refetch - Function to manually refetch the query
 */

/**
 * A component that wraps React Query's useQuery hook and provides a render prop interface
 * for handling async data fetching states.
 * 
 * @param {Object} props
 * @param {function(QueryState): JSX.Element} props.children - Render prop function that receives query state
 * @param {Object} props.queryOptions - Options passed to useQuery hook
 * @param {string[]} props.queryOptions.queryKey - Unique key for the query
 * @param {function(): Promise<any>} props.queryOptions.queryFn - Function that returns a promise with the data
 * @returns {JSX.Element}
 */
const Await = ({ children, ...queryOptions }) => {
  const queryState = useQuery(queryOptions);

  // Ensure children is a function
  if (typeof children !== "function") {
    throw new Error("The children of <Await> must be a function.");
  }

  return <>{children(queryState)}</>;
};

export default Await;

/**
 * Usage Example:
 * 
 * ```jsx
 * import Await from './components/common/Await';
 * 
 * const MyComponent = () => {
 *   return (
 *     <Await
 *       queryKey={['users']}
 *       queryFn={() => fetch('/api/users').then(res => res.json())}
 *     >
 *       {({ data, isLoading, error }) => {
 *         if (isLoading) return <div>Loading...</div>;
 *         if (error) return <div>Error: {error.message}</div>;
 *         return (
 *           <ul>
 *             {data.map(user => (
 *               <li key={user.id}>{user.name}</li>
 *             ))}
 *           </ul>
 *         );
 *       }}
 *     </Await>
 *   );
 * };
 * ```
 */
