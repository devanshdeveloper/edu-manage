import React from "react";

/**
 * @typedef {Object} SwitchProps
 * @property {string|number} value - The value to match against case components
 * @property {Object.<string|number, React.ReactNode>} cases - Object mapping values to React components
 */

/**
 * A component that conditionally renders content based on a value matching defined cases.
 * Provides a declarative alternative to multiple if/else or switch statements.
 * 
 * @param {SwitchProps} props - Component props
 * @returns {React.ReactNode|null} Rendered case component or null if no match
 */
const Switch = ({ value, cases }) => {
  const Case = cases?.[value];
  return Case || null;
};

export default Switch;

/**
 * Usage Example:
 * 
 * ```jsx
 * import Switch from './components/common/Switch';
 * 
 * function PaymentStatus({ status }) {
 *   return (
 *     <Switch
 *       value={status}
 *       cases={{
 *         pending: (
 *           <div className="text-yellow-500">
 *             <span>Payment Pending</span>
 *           </div>
 *         ),
 *         completed: (
 *           <div className="text-green-500">
 *             <span>Payment Successful</span>
 *           </div>
 *         ),
 *         failed: (
 *           <div className="text-red-500">
 *             <span>Payment Failed</span>
 *           </div>
 *         )
 *       }}
 *     />
 *   );
 * }
 * ```
 */
