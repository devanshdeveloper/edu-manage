import {Spinner} from "@heroui/spinner";

/**
 * @typedef {Object} RenderSuspenseProps
 * @property {Error|null} [error=null] - Error object if any error occurred
 * @property {boolean} [isLoading=false] - Loading state indicator
 * @property {React.ReactNode} [errorFallback] - Custom error component to render when error occurs
 * @property {React.ReactNode} [loadingFallback] - Custom loading component to render during loading state
 * @property {React.ReactNode} children - Child components to render when data is available
 * @property {any} data - Data to be rendered
 * @property {React.ReactNode} [notFoundFallback] - Custom component to render when data is empty
 */

/**
 * A component that handles loading, error, and empty states for data fetching operations.
 * Provides fallback UI for different states while managing the rendering of child components.
 * 
 * @param {RenderSuspenseProps} props - Component props
 * @returns {React.ReactNode} Rendered content based on current state
 */
function RenderSuspense({
  error = null,
  isLoading = false,
  errorFallback = <div>{error?.message}</div>,
  loadingFallback = <Spinner />,
  children,
  data,
  notFoundFallback = <div>Data not found</div>,
}) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {loadingFallback}
      </div>
    );
  }

  if (error) {
    return errorFallback;
  }

  if (!data || data?.length === 0) {
    return notFoundFallback;
  }

  return children;
}

export default RenderSuspense;

/**
 * Usage Example:
 * 
 * ```jsx
 * import RenderSuspense from './components/common/RenderSuspense';
 * import { useQuery } from '@tanstack/react-query';
 * 
 * function UserProfile({ userId }) {
 *   const { data, isLoading, error } = useQuery({
 *     queryKey: ['user', userId],
 *     queryFn: () => fetchUserData(userId)
 *   });
 * 
 *   return (
 *     <RenderSuspense
 *       isLoading={isLoading}
 *       error={error}
 *       data={data}
 *       loadingFallback={<div>Loading user profile...</div>}
 *       errorFallback={<div>Failed to load user profile</div>}
 *       notFoundFallback={<div>User not found</div>}
 *     >
 *       <div className="profile-container">
 *         <h1>{data.name}</h1>
 *         <p>{data.email}</p>
 *       </div>
 *     </RenderSuspense>
 *   );
 * }
 * ```
 */
