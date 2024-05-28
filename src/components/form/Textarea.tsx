import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";

export const TextareaElement: React.FC<Props> = ({
  className = "",
  containerClassName = "",
  errorMessages,
  name,
  onChange,
  ...props
}) => (
  <div className={`relative ${containerClassName}`.trim()}>
    <textarea
      className={`form-field w-full ${className}`.trim()}
      name={name}
      onChange={e => {
        onChange(e.target.value);
      }}
      {...props}
    />
    {errorMessages && (
      <ErrorMessage errorMessages={errorMessages} path={name} />
    )}
  </div>
);

export interface Props
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  readonly containerClassName?: string;
  readonly errorMessages?: readonly FieldError[];
  readonly onChange: (value: string) => void;
}
