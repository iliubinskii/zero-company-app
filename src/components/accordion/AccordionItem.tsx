"use client";

import type { FC, ReactNode } from "react";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

export const AccordionItem: FC<Props> = ({ children, className, header }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container className={className}>
      <Header
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {header}
      </Header>
      {isExpanded && <Contents>{children}</Contents>}
    </Container>
  );
};

export interface Props {
  readonly children?: ReactNode | undefined;
  readonly className?: string;
  readonly header?: ReactNode | undefined;
}

const Container = tw.div`p-6 flex flex-col gap-6`;

const Header = tw.div`text-gray-700 cursor-pointer select-none`;

const Contents = tw.div`px-2`;
