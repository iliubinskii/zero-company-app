import type { FC } from "react";
import type { FieldError } from "../../schema";
import React from "react";
import styles from "./ErrorMessage.module.css";

export const ErrorMessage: FC<ErrorMessageProps> = ({
  errorMessages,
  path
}) => (
  <div className={styles["container"]}>
    {errorMessages
      .filter(field => field.path === path)
      .map((field, index) => (
        <div key={index}>{field.message}</div>
      ))}
  </div>
);

export interface ErrorMessageProps {
  readonly errorMessages: readonly FieldError[];
  readonly path?: string | undefined;
}
