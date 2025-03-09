/**
 * @typedef {Object} IfProps
 * @property {boolean} condition - The condition to evaluate
 * @property {React.ReactNode} children - Content to render when condition is true
 * @property {React.ReactNode} [fallback=null] - Content to render when condition is false
 */

/**
 * A conditional rendering component that shows content based on a condition
 * @param {IfProps} props - Component props
 * @returns {React.ReactNode} - Rendered content based on condition
 */
const If = ({ condition, children, fallback = null }) => {
  return condition ? children : fallback;
};

export default If;

/**
 * Usage Examples:
 * 
 * 1. Basic conditional rendering:
 * ```jsx
 * <If condition={isLoggedIn}>
 *   <UserDashboard />
 * </If>
 * ```
 * 
 * 2. With fallback content:
 * ```jsx
 * <If condition={isLoaded} fallback={<LoadingSpinner />}>
 *   <DataTable data={tableData} />
 * </If>
 * ```
 * 
 * 3. Nested conditions:
 * ```jsx
 * <If condition={hasPermission}>
 *   <If condition={isAdmin}>
 *     <AdminPanel />
 *   </If>
 *   <If condition={isUser}>
 *     <UserPanel />
 *   </If>
 * </If>
 * ```
 * 
 * 4. With dynamic expressions:
 * ```jsx
 * <If condition={users.length > 0}>
 *   <UserList users={users} />
 * <If fallback={<EmptyState message="No users found" />}>
 * ```
 */
