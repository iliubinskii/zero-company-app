"use client";

import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { SHOW_SNACKBAR_DURATION_MS } from "../consts";
import { noop } from "lodash";
import styles from "./Snackbar.module.css";

export const Snackbar: React.FC<Props> = ({
  duration = SHOW_SNACKBAR_DURATION_MS,
  isOpen,
  message,
  onClose = noop,
  variant = "info"
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={
        isOpen ? styles[`open-${variant}`] : styles[`closed-${variant}`]
      }
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <span>{message}</span>
      <MdClose className={styles[`icon-${variant}`]} onClick={onClose} />
    </div>
  );
};

export interface Props {
  readonly duration?: number;
  readonly isOpen: boolean;
  readonly message: string;
  readonly onClose?: () => void;
  readonly variant?: "error" | "info" | "success";
}
