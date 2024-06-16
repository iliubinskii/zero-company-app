import { AnimatedLink } from "./AnimatedLink";
import type { FC } from "react";
import React from "react";
import tw from "tailwind-styled-components";

export const NoContent: FC<Props> = ({ buttonText, href, text, title }) => (
  <Container>
    <Icon>
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v12a2 2 0 002 2h14a2 2 0 002-2V7m-5 4h.01M12 11h.01M9 16h6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </Icon>
    <Title>{title}</Title>
    <Text>{text}</Text>
    <AnimatedLink className="px-4 py-2 primary-button" href={href}>
      {buttonText}
    </AnimatedLink>
  </Container>
);

export interface Props {
  readonly buttonText: string;
  readonly href: string;
  readonly text: string;
  readonly title: string;
}

const Container = tw.div`h-full rounded-lg bg-gray-100 shadow-md p-6 flex flex-col justify-center items-center`;

const Icon = tw.div`w-16 h-16 mb-4 text-gray-400`;

const Title = tw.h2`mb-2 text-xl font-semibold text-gray-700`;

const Text = tw.p`mb-4 text-gray-500`;
