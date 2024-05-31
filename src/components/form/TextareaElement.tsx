import type { FC, TextareaHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";
import { noop } from "lodash";

export const TextareaElement: FC<Props> = ({
  className = "",
  containerClassName = "",
  errorMessages = [],
  name,
  onChange,
  onResetErrors = noop,
  ...props
}) => (
  <div className={`relative ${containerClassName}`.trim()}>
    <textarea
      className={`form-field w-full ${className}`.trim()}
      name={name}
      onChange={e => {
        onChange(e.target.value);
        onResetErrors(name);
      }}
      {...props}
    />
    {errorMessages.length > 0 && (
      <ErrorMessage errorMessages={errorMessages} path={name} />
    )}
  </div>
);

export interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  readonly containerClassName?: string;
  readonly errorMessages?: readonly FieldError[];
  readonly onChange: (value: string) => void;
  readonly onResetErrors?: (name?: string) => void;
}
