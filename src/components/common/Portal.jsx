import { createPortal } from "react-dom";

/**
 * @typedef {Object} PortalProps
 * @property {React.ReactNode} children - Content to render inside the portal
 */

/**
 * A basic portal component that renders its children into the document body
 * @param {PortalProps} props - Component props
 * @returns {React.ReactPortal} - Portal component
 */
const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

export default Portal;

/**
 * Usage Examples:
 * 
 * 1. Basic modal dialog:
 * ```jsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * return (
 *   <>
 *     <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *     {isOpen && (
 *       <Portal>
 *         <div className="modal-overlay">
 *           <div className="modal-content">
 *             <h2>Modal Title</h2>
 *             <p>Modal content goes here...</p>
 *             <button onClick={() => setIsOpen(false)}>Close</button>
 *           </div>
 *         </div>
 *       </Portal>
 *     )}
 *   </>
 * );
 * ```
 * 
 * 2. Toast notifications:
 * ```jsx
 * const ToastContainer = () => (
 *   <Portal>
 *     <div className="toast-container">
 *       {toasts.map(toast => (
 *         <div key={toast.id} className="toast">
 *           {toast.message}
 *         </div>
 *       ))}
 *     </div>
 *   </Portal>
 * );
 * ```
 * 
 * 3. Global loading indicator:
 * ```jsx
 * const LoadingOverlay = ({ isLoading }) => {
 *   if (!isLoading) return null;
 *   
 *   return (
 *     <Portal>
 *       <div className="loading-overlay">
 *         <div className="spinner" />
 *       </div>
 *     </Portal>
 *   );
 * };
 * ```
 */
