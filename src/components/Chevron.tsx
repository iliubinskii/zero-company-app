import { MdExpandMore } from "react-icons/md";
import React from "react";
import tw from "tailwind-styled-components";

export const Chevron: React.FC<Props> = ({ isUp }) => (
  <Icon className={isUp ? "transform rotate-180" : ""} />
);

export interface Props {
  readonly isUp: boolean;
}

const Icon = tw(MdExpandMore)`
  text-gray-500 cursor-pointer w-6 h-6
  transition-all duration-300
`;
