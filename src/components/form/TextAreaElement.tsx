"use client";

import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";

export const TextAreaElement: React.FC<TextareaElementProps> = ({
  errorMessages,
  name,
  onChange,
  otherStyles,
  placeholder,
  value
}) => (
  <>
    <textarea
      className={otherStyles}
      name={name}
      onChange={e => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
      value={value}
    />
    {errorMessages && <ErrorMessage errorMessages={[...errorMessages]} />}
  </>
);

export interface TextareaElementProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  readonly errorMessages?: readonly FieldError[];
  readonly name: string;
  readonly onChange: (value: string) => void;
  readonly otherStyles?: string;
  readonly placeholder?: string;
  readonly value: string;
}
