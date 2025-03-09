import { useLocation } from "react-router";

/**
 * A custom hook that returns the current pathname from the URL.
 * This hook provides a simple way to access the current route's pathname
 * without having to destructure from useLocation.
 *
 * @returns {string} The current pathname from the URL
 *
 * @example
 * // Basic usage in a component
 * function BreadcrumbNav() {
 *   const pathname = usePathname();
 *   return (
 *     <nav aria-label="breadcrumb">
 *       <span>Current path: {pathname}</span>
 *     </nav>
 *   );
 * }
 *
 * @example
 * // Using with path-based conditions
 * function ConditionalLayout() {
 *   const pathname = usePathname();
 *   
 *   if (pathname.startsWith('/admin')) {
 *     return <AdminLayout />;
 *   }
 *   
 *   return <DefaultLayout />;
 * }
 */
function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export default usePathname;
