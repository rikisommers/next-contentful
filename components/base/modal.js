import React, { useEffect } from "react";
import { motion, AnimatePresence } from "../../utils/motion";
import Close from "../base/close";

export const ModalDirection = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  ORIGIN: "origin",
};

export const ModalWidth = {
  FULL: "full",
  HALF: "1/2",
  THIRD: "1/3",
  QUARTER: "1/4",
  PANEL_SM: "panel-sm",
};

export const ModalPosition = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  CENTER: "center",
};

const Modal = ({
  isOpen,
  onClose,
  children,
  direction = ModalDirection.RIGHT,
  width = ModalWidth.PANEL_SM,
  position = ModalPosition.BOTTOM_RIGHT,
  bodyClass = "modal-active",
  ariaLabel = "Modal dialog",
}) => {
  useEffect(() => {
    if (isOpen && bodyClass) {
      document.body.classList.add(bodyClass);
    }
    return () => {
      if (bodyClass) {
        document.body.classList.remove(bodyClass);
      }
    };
  }, [isOpen, bodyClass]);

  const directionVariants = {
    [ModalDirection.LEFT]: {
      initial: { x: "-100%", opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 1 },
    },
    [ModalDirection.RIGHT]: {
      initial: { x: "100%", opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 1 },
    },
    [ModalDirection.TOP]: {
      initial: { y: "-100%", opacity: 1 },
      animate: { y: 0, opacity: 1 },
      exit: { y: "-100%", opacity: 1 },
    },
    [ModalDirection.BOTTOM]: {
      initial: { y: "100%", opacity: 1 },
      animate: { y: 0, opacity: 1 },
      exit: { y: "100%", opacity: 1 },
    },
    [ModalDirection.ORIGIN]: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  const selectedVariant = directionVariants[direction] || directionVariants[ModalDirection.RIGHT];

  const widthClasses = {
    [ModalWidth.FULL]: "w-full",
    [ModalWidth.HALF]: "w-1/2",
    [ModalWidth.THIRD]: "w-1/3",
    [ModalWidth.QUARTER]: "w-1/4",
    [ModalWidth.PANEL_SM]: "w-80",
  };

  const positionClasses = {
    [ModalPosition.TOP_LEFT]: "top-0 left-0",
    [ModalPosition.TOP_RIGHT]: "top-0 right-0",
    [ModalPosition.BOTTOM_LEFT]: "bottom-0 left-0",
    [ModalPosition.BOTTOM_RIGHT]: "bottom-0 right-0",
    [ModalPosition.CENTER]: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };

  const modalClasses = `fixed shadow-2xl z-50 ${widthClasses[width]} ${positionClasses[position]}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={selectedVariant}
          transition={{
            duration: 0,
            ease: [0.33, 1, 0.68, 1],
          }}
          className={modalClasses}
        >
          <Close onClick={onClose} aria-label="Close dialog" />

          <motion.div className="flex z-10 flex-col flex-grow gap-3 rounded-lg">
              {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
