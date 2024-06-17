import type { ButtonHTMLAttributes, FC } from "react";
import React from "react";
import { noop } from "lodash";
import tw from "tailwind-styled-components";

export const AsyncButton: FC<Props> = ({
  children,
  isLoading,
  onClick = noop,
  ...props
}) => {
  const clickHandler = (): void => {
    if (isLoading) {
      // Do not handle click event if the button is loading.
    } else onClick();
  };

  return (
    <Button onClick={clickHandler} {...props}>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <span className={isLoading ? "opacity-0" : undefined}>{children}</span>
    </Button>
  );
};

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly isLoading: boolean;
}

const Button = tw.button`relative`;

const SpinnerContainer = tw.div`absolute inset-0 flex items-center justify-center`;

const Spinner = tw.div`
  w-5 h-5
  border-2 border-t-transparent border-solid rounded-full
  animate-spin
`;
