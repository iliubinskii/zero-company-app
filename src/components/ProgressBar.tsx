import type { FC, HTMLAttributes } from "react";
import React from "react";
import tw from "tailwind-styled-components";

export const ProgressBar: FC<Props> = ({ progress, ...props }) => (
  <Container {...props}>
    <Fill style={{ width: `${progress}%` }} />
  </Container>
);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  readonly progress: number;
}

const Container = tw.div`h-2 rounded bg-gray-300 flex`;

const Fill = tw.div`h-2 rounded bg-blue-500`;
