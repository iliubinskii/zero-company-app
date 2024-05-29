"use client";
// parent has use client rule, but if i don't add this rule here, app falls

import { MdClose } from "react-icons/md";
import React, { useCallback, useEffect } from "react";
import { SHOW_SNACKBAR_DURATION } from "../consts";
import styles from "./SnackBar.module.css";

export const SnackBar: React.FC<Props> = ({
  duration = SHOW_SNACKBAR_DURATION,
  isOpen,
  message,
  onClose
  // TS71007: Props must be serializable for components in the "use client" entry file, "onClose" is invalid. - How to fix?
}) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      window.addEventListener("keydown", handleEscape);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleEscape);
      };
    }

    // Return a cleanup function even if isOpen is false
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, duration, onClose, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className={styles["outer-container"]} onClick={onClose}>
      <div
        className={styles["inner-container"]}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span>{message}</span>
        <MdClose className={styles["icon"]} onClick={onClose} />
      </div>
    </div>
  );
};

export interface Props {
  readonly duration?: number;
  readonly isOpen: boolean;
  readonly message: string;
  readonly onClose: () => void;
}
