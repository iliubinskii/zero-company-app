"use client";

import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";

export const InputElement: React.FC<InputElementProps> = ({
  accept,
  errorMessages,
  min,
  name,
  onChange,
  otherStyles,
  placeholder,
  step,
  type,
  value
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e.target.value);
  };
  return (
    <>
      <input
        accept={accept}
        className={otherStyles}
        min={min}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        step={step}
        type={type}
        value={value}
      />
      {errorMessages && <ErrorMessage errorMessages={[...errorMessages]} />}
    </>
  );
};

export interface InputElementProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  readonly accept?: string | undefined;
  readonly errorMessages?: readonly FieldError[];
  readonly min?: number;
  readonly name: string;
  readonly onChange?: (value: string) => void;
  readonly otherStyles?: string;
  readonly placeholder?: string;
  readonly step?: number;
  readonly type: string;
  readonly value?: string;
}
