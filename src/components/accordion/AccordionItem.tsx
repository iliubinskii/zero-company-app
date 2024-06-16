"use client";

import type { FC, ReactNode } from "react";
import { Chevron } from "../Chevron";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

export const AccordionItem: FC<Props> = ({
  alwaysOpen,
  children,
  className,
  header
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const open = alwaysOpen || isExpanded;

  return (
    <Container className={className}>
      {alwaysOpen ? (
        <Header>{header}</Header>
      ) : (
        <Header
          className="cursor-pointer"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <HeaderContents>{header}</HeaderContents>
          <Chevron isUp={isExpanded} />
        </Header>
      )}
      <Contents className={open ? "max-h-screen" : "max-h-0"}>
        {children}
      </Contents>
    </Container>
  );
};

export interface Props {
  readonly alwaysOpen?: boolean;
  readonly children?: ReactNode | undefined;
  readonly className?: string;
  readonly header?: ReactNode | undefined;
}

const Container = tw.div`p-6 flex flex-col gap-6`;

const Header = tw.div`text-gray-700 select-none flex items-center gap-3`;

const HeaderContents = tw.div`grow flex items-center`;

const Contents = tw.div`overflow-hidden transition-max-height duration-300 ease-in-out`;
