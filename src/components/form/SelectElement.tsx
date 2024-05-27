"use client";

import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";

export const SelectElement: React.FC<SelectElementProps> = ({
  errorMessages,
  name,
  onChange,
  options,
  otherStyles,
  placeholder,
  value
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(e.target.value);
  };
  return (
    <>
      <select
        className={otherStyles}
        name={name}
        onChange={handleChange}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessages && <ErrorMessage errorMessages={[...errorMessages]} />}
    </>
  );
};

export interface SelectElementProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  readonly errorMessages?: readonly FieldError[];
  readonly name: string;
  readonly onChange: (value: string) => void;
  readonly options: { label: string; value: string }[];
  readonly otherStyles?: string;
  readonly placeholder?: string;
  readonly value: string;
}
