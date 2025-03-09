import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import OutsideClick from "./OutsideClick";

/**
 * @typedef {Object} PortalProps
 * @property {React.ReactNode} children - Content to render inside the portal
 * @property {boolean} isOpen - Controls the visibility of the portal
 * @property {() => void} onClose - Callback function when portal should close
 * @property {HTMLElement} referenceElement - Element to position the portal relative to
 * @property {'top'|'bottom'|'left'|'right'} [position='bottom'] - Position of the portal relative to the reference element
 */

/**
 * A floating portal component that renders content at a specific position relative to a reference element
 * @param {PortalProps} props - Component props
 * @returns {React.ReactPortal|null} - Portal component or null if not open
 */
const Portal = ({
  children,
  isOpen,
  onClose,
  referenceElement,
  position = "bottom",
}) => {
  const portalRef = useRef(null);

  // Create a DOM node for the portal if it doesn't already exist
  useEffect(() => {
    if (!portalRef.current) {
      portalRef.current = document.createElement("div");
      document.body.appendChild(portalRef.current);
    }
    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, []);

  // Positioning logic
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (referenceElement && isOpen) {
      const rect = referenceElement.getBoundingClientRect();
      let calculatedStyle = {};
      switch (position) {
        case "bottom":
          calculatedStyle = {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX - 50,
          };
          break;
        case "top":
          calculatedStyle = {
            top: rect.top + window.scrollY - rect.height,
            left: rect.left + window.scrollX,
          };
          break;
        case "left":
          calculatedStyle = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX - rect.width,
          };
          break;
        case "right":
          calculatedStyle = {
            top: rect.top + window.scrollY,
            left: rect.right + window.scrollX,
          };
          break;
        default:
          break;
      }
      setStyle(calculatedStyle);
    }
  }, [referenceElement, isOpen, position]);

  const onOutsideClick = useCallback(() => {
    onClose();
  }, []);

  if (!isOpen || !portalRef.current) {
    return null;
  }

  return ReactDOM.createPortal(
    <OutsideClick onOutsideClick={onOutsideClick}>
      <div style={{ position: "absolute", ...style, zIndex: 1000 }}>
        {children}
      </div>
    </OutsideClick>,
    portalRef.current
  );
};

export default Portal;

/**
 * Usage Examples:
 * 
 * 1. Basic dropdown menu:
 * ```jsx
 * const [isOpen, setIsOpen] = useState(false);
 * const buttonRef = useRef(null);
 * 
 * return (
 *   <>
 *     <button ref={buttonRef} onClick={() => setIsOpen(true)}>Open Menu</button>
 *     <FloatingPortal
 *       isOpen={isOpen}
 *       onClose={() => setIsOpen(false)}
 *       referenceElement={buttonRef.current}
 *       position="bottom"
 *     >
 *       <div className="menu">
 *         <button>Option 1</button>
 *         <button>Option 2</button>
 *       </div>
 *     </FloatingPortal>
 *   </>
 * );
 * ```
 * 
 * 2. Tooltip example:
 * ```jsx
 * const [showTooltip, setShowTooltip] = useState(false);
 * const elementRef = useRef(null);
 * 
 * return (
 *   <>
 *     <span
 *       ref={elementRef}
 *       onMouseEnter={() => setShowTooltip(true)}
 *       onMouseLeave={() => setShowTooltip(false)}
 *     >
 *       Hover me
 *     </span>
 *     <FloatingPortal
 *       isOpen={showTooltip}
 *       onClose={() => setShowTooltip(false)}
 *       referenceElement={elementRef.current}
 *       position="top"
 *     >
 *       <div className="tooltip">Tooltip content</div>
 *     </FloatingPortal>
 *   </>
 * );
 * ```
 * 
 * 3. Context menu example:
 * ```jsx
 * const [menuPosition, setMenuPosition] = useState(null);
 * const menuRef = useRef(null);
 * 
 * const handleContextMenu = (e) => {
 *   e.preventDefault();
 *   setMenuPosition({ current: { getBoundingClientRect: () => ({
 *     top: e.clientY,
 *     left: e.clientX,
 *     width: 0,
 *     height: 0
 *   })}});
 * };
 * 
 * return (
 *   <div onContextMenu={handleContextMenu}>
 *     Right click anywhere
 *     <FloatingPortal
 *       isOpen={!!menuPosition}
 *       onClose={() => setMenuPosition(null)}
 *       referenceElement={menuPosition}
 *       position="bottom"
 *     >
 *       <div className="context-menu">
 *         <button>Cut</button>
 *         <button>Copy</button>
 *         <button>Paste</button>
 *       </div>
 *     </FloatingPortal>
 *   </div>
 * );
 * ```
 */
