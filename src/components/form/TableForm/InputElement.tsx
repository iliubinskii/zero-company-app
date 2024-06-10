import type { FC, InputHTMLAttributes } from "react";
import type { FieldError } from "../../../schema";
import React from "react";
import { noop } from "lodash";
import tw from "tailwind-styled-components";

export const InputElement: FC<Props> = ({
  errorMessages = [],
  name,
  onChange,
  onResetErrors = noop,
  ...props
}) => {
  const Input = errorMessages.some(field => field.path === name)
    ? InputWithError
    : InputWithoutError;

  return (
    <Input
      name={name}
      onChange={e => {
        onChange(e.target.value);
        onResetErrors(name);
      }}
      {...props}
    />
  );
};

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  readonly errorMessages?: readonly FieldError[] | undefined;
  readonly inputClassName?: string | undefined;
  readonly onChange: (value: string) => void;
  readonly onResetErrors?: ((name?: string) => void) | undefined;
}

const BaseInput = tw.input`
  w-full rounded
  appearance-none bg-transparent border-none
  focus:bg-white focus:outline-none
`;

const InputWithError = tw(BaseInput)`
  ring-1 ring-red-600
  focus:ring-1 focus:ring-red-600
`;

const InputWithoutError = tw(BaseInput)`focus:ring-1 focus:ring-blue-600`;
