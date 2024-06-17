"use client";

import type { FC, ReactNode } from "react";
import { Chevron } from "../Chevron";
import React, { useMemo, useState } from "react";
import tw from "tailwind-styled-components";

export const AccordionItem: FC<Props> = ({
  alwaysOpen,
  children,
  className,
  disabled = undefined,
  header
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const open = alwaysOpen || isExpanded;

  const wrappedHeader = useMemo(() => {
    if (alwaysOpen) return <Header>{header}</Header>;

    if (disabled) return <Header className="opacity-50">{header}</Header>;

    return (
      <Header
        className="cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <HeaderContents>{header}</HeaderContents>
        <Chevron isUp={isExpanded} />
      </Header>
    );
  }, [alwaysOpen, disabled, header, isExpanded]);

  return (
    <Container className={className}>
      {wrappedHeader}
      <Contents
        style={{
          maxHeight: open ? "2000px" : "0px"
        }}
      >
        <div className="pt-5 pb-1 px-1">{children}</div>
      </Contents>
    </Container>
  );
};

export interface Props {
  readonly alwaysOpen?: boolean | undefined;
  readonly children?: ReactNode | undefined;
  readonly className?: string | undefined;
  readonly disabled?: boolean | undefined;
  readonly header?: ReactNode | undefined;
}
const Container = tw.div`p-5 flex flex-col`;

const Header = tw.div`text-gray-700 select-none flex items-center gap-3`;

const HeaderContents = tw.div`grow flex items-center`;

const Contents = tw.div`overflow-hidden transition-max-height duration-500 ease-in-out`;
