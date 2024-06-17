import type { FC, ReactNode } from "react";
import { AccordionItem } from "./AccordionItem";
import { CircularIcon } from "./CircularIcon";
import type { IconType } from "react-icons";
import React from "react";

export const IconAccordionItem: FC<Props> = ({
  Icon,
  alwaysOpen = false,
  children,
  description,
  disabled,
  title
}) => (
  <AccordionItem
    alwaysOpen={alwaysOpen}
    disabled={disabled}
    header={
      <div className="flex gap-4">
        <CircularIcon Icon={Icon} disabled={disabled} />
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
  readonly alwaysOpen?: boolean | undefined;
  readonly children?: ReactNode | undefined;
  readonly description: string;
  readonly disabled?: boolean | undefined;
  readonly title: string;
}
