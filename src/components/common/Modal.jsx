import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseSquareIcon } from "../../constants/svg-imports";
import { cn } from "../../utils/cn";

const Modal = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "bg-white rounded-lg shadow-lg w-96 max-w-full p-6 max-h-[90vh] overflow-y-auto hidden-scrollbar",
              className
            )}
          >
            <div className="relative w-full">
              <div className=" top-0 left-0 flex justify-between items-center w-full h-5 bg-white">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button
                type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseSquareIcon />
                </button>
              </div>
              <div className="h-5"></div>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
