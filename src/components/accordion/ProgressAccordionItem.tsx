import type { FC, ReactNode } from "react";
import { AccordionItem } from "./AccordionItem";
import { CircularProgress } from "./CircularProgress";
import React from "react";

export const ProgressAccordionItem: FC<Props> = ({
  alwaysOpen = false,
  children,
  description,
  disabled,
  progress,
  title
}) => (
  <AccordionItem
    alwaysOpen={alwaysOpen}
    disabled={disabled}
    header={
      <div className="flex gap-4">
        <CircularProgress disabled={disabled} progress={progress} />
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
  readonly alwaysOpen?: boolean | undefined;
  readonly children?: ReactNode;
  readonly description: string;
  readonly disabled?: boolean | undefined;
  readonly progress: number;
  readonly title: string;
}
