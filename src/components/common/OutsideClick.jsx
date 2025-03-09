import React, { useEffect, useRef } from "react";

/**
 * @typedef {Object} OutsideClickProps
 * @property {React.ReactNode} children - Content to render inside the click detection area
 * @property {() => void} onOutsideClick - Callback function triggered when a click occurs outside the component
 */

/**
 * A component that detects clicks outside of its boundaries and triggers a callback
 * @param {OutsideClickProps} props - Component props
 * @returns {React.ReactElement} - The wrapped component with outside click detection
 */
const OutsideClick = ({ children, onOutsideClick }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClick;

/**
 * Usage Examples:
 * 
 * 1. Basic dropdown menu:
 * ```jsx
 * const [isOpen, setIsOpen] = useState(true);
 * 
 * return (
 *   <OutsideClick onOutsideClick={() => setIsOpen(false)}>
 *     <div className="dropdown">
 *       <button onClick={() => setIsOpen(true)}>Toggle</button>
 *       {isOpen && (
 *         <ul className="dropdown-menu">
 *           <li>Option 1</li>
 *           <li>Option 2</li>
 *         </ul>
 *       )}
 *     </div>
 *   </OutsideClick>
 * );
 * ```
 * 
 * 2. Modal dialog:
 * ```jsx
 * const [showModal, setShowModal] = useState(false);
 * 
 * return (
 *   <div>
 *     <button onClick={() => setShowModal(true)}>Open Modal</button>
 *     {showModal && (
 *       <div className="modal-overlay">
 *         <OutsideClick onOutsideClick={() => setShowModal(false)}>
 *           <div className="modal-content">
 *             <h2>Modal Title</h2>
 *             <p>Modal content goes here...</p>
 *           </div>
 *         </OutsideClick>
 *       </div>
 *     )}
 *   </div>
 * );
 * ```
 * 
 * 3. Context menu:
 * ```jsx
 * const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
 * 
 * const handleContextMenu = (e) => {
 *   e.preventDefault();
 *   setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
 * };
 * 
 * return (
 *   <div onContextMenu={handleContextMenu}>
 *     Right click anywhere
 *     {contextMenu.visible && (
 *       <OutsideClick onOutsideClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}>
 *         <div
 *           style={{
 *             position: 'fixed',
 *             top: contextMenu.y,
 *             left: contextMenu.x,
 *           }}
 *         >
 *           <div className="context-menu">
 *             <button>Cut</button>
 *             <button>Copy</button>
 *             <button>Paste</button>
 *           </div>
 *         </div>
 *       </OutsideClick>
 *     )}
 *   </div>
 * );
 * ```
 */
