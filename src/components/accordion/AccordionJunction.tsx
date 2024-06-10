import type { FC } from "react";
import React from "react";
import tw from "tailwind-styled-components";

export const AccordionJunction: FC = () => (
  <Container>
    <VerticalLine>
      <Line />
    </VerticalLine>
    <Circle />
  </Container>
);

const Container = tw.div`relative h-16 w-24 flex flex-col items-center`;

const VerticalLine = tw.div`absolute inset-0 flex justify-center`;

const Line = tw.div`w-0.5 h-full bg-gray-300`;

const Circle = tw.div`
  absolute top-1/2 transform -translate-y-1/2
  rounded-full
  w-4 h-4
  bg-gray-300
`;
