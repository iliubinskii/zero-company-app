import type { FC, HTMLAttributes } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import React from "react";
import tw from "tailwind-styled-components";

export const HeartIcon: FC<HTMLAttributes<HTMLDivElement>> = props => (
  <Container {...props}>
    <Icon />
  </Container>
);

const Container = tw.span`
  w-6 h-6
  rounded-full bg-green-primary/70
  flex justify-center items-center
`;

const Icon = tw(HiOutlineHeart)`transform translate-y-[2px] text-xl`;
