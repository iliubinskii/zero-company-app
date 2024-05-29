"use client";

import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { SHOW_SNACKBAR_DURATION_MS } from "../consts";
import styles from "./Snackbar.module.css";

export const Snackbar: React.FC<Props> = ({
  duration = SHOW_SNACKBAR_DURATION_MS,
  isOpen,
  message,
  // TS71007: Weird typescript error that appears only in the editor, switch to vscode's version of typescript
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={isOpen ? styles["container-open"] : styles["container"]}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <span>{message}</span>
      <MdClose className={styles["icon"]} onClick={onClose} />
    </div>
  );
};

export interface Props {
  readonly duration?: number;
  readonly isOpen: boolean;
  readonly message: string;
  readonly onClose: () => void;
}
