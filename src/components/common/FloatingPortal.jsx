import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import OutsideClick from "./OutsideClick";

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
