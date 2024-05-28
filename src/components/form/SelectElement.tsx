import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";

export const SelectElement: React.FC<Props> = ({
  className = "",
  containerClassName = "",
  errorMessages,
  name,
  onChange,
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
    {errorMessages && (
      <ErrorMessage errorMessages={errorMessages} path={name} />
    )}
  </div>
);

export interface Props
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  readonly containerClassName?: string;
  readonly errorMessages?: readonly FieldError[];
  readonly onChange: (value: string) => void;
  readonly options: SelectOption[];
  readonly placeholder?: string;
}

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}
