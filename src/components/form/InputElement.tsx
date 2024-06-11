import type { FC, InputHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React from "react";
import { noop } from "lodash";
import tw from "tailwind-styled-components";

export const InputElement: FC<Props> = ({
  errorMessages = [],
  name,
  onChange,
  onResetErrors = noop,
  ...props
}) => (
  <Container>
    <Input
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
  </Container>
);

export interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "onChange"
  > {
  readonly errorMessages?: readonly FieldError[] | undefined;
  readonly onChange: (value: string) => void;
  readonly onResetErrors?: ((name?: string) => void) | undefined;
}

const Container = tw.div`relative`;

const Input = tw.input`w-full form-field`;
