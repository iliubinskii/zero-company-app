import type { FC } from "react";
import type { FieldError } from "../../schema";
import React from "react";
import tw from "tailwind-styled-components";

export const ErrorMessage: FC<Props> = ({ errorMessages, path }) => (
  <Container>
    {errorMessages
      .filter(field => field.path === path)
      .map((field, index) => (
        <div key={index}>{field.message}</div>
      ))}
  </Container>
);

export interface Props {
  readonly errorMessages: readonly FieldError[];
  readonly path?: string | undefined;
}

const Container = tw.div`
  z-10
  absolute left-0 right-0 -bottom-1 transform translate-y-full
  text-sm text-red-700
  flex flex-col gap-1
`;
