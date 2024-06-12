import type { FC, ReactNode } from "react";
import { AccordionItem } from "./AccordionItem";
import { CircularIcon } from "../circular-components";
import type { IconType } from "react-icons";
import React from "react";

export const IconAccordionItem: FC<Props> = ({
  Icon,
  alwaysOpen = false,
  children,
  description,
  title
}) => (
  <AccordionItem
    alwaysOpen={alwaysOpen}
    header={
      <div className="flex gap-4">
        <CircularIcon Icon={Icon} />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    }
  >
    {children}
  </AccordionItem>
);

export interface Props {
  readonly Icon: IconType;
  readonly alwaysOpen?: boolean;
  readonly children?: ReactNode | undefined;
  readonly description: string;
  readonly title: string;
}
