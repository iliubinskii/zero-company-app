import type { FC, SelectHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";
import { noop } from "lodash";

export const SelectElement: FC<Props> = ({
  className = "",
  containerClassName = "",
  errorMessages = [],
  name,
  onChange,
  onResetErrors = noop,
  options,
  placeholder,
  ...props
}) => (
  <div className={`relative ${containerClassName}`.trim()}>
    <select
      className={`form-field w-full ${className}`.trim()}
      name={name}
      onChange={e => {
        onChange(e.target.value);
        onResetErrors(name);
      }}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errorMessages.length > 0 && (
      <ErrorMessage errorMessages={errorMessages} path={name} />
    )}
  </div>
);

export interface Props
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  readonly containerClassName?: string | undefined;
  readonly errorMessages?: readonly FieldError[] | undefined;
  readonly onChange: (value: string) => void;
  readonly onResetErrors?: ((name?: string) => void) | undefined;
  readonly options: SelectOption[];
  readonly placeholder?: string | undefined;
}

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}
