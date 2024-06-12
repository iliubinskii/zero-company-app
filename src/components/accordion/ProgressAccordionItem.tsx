import type { FC, ReactNode } from "react";
import { AccordionItem } from "./AccordionItem";
import { CircularProgress } from "../circular-components";
import React from "react";

export const ProgressAccordionItem: FC<Props> = ({
  alwaysOpen = false,
  children,
  description,
  progress,
  title
}) => (
  <AccordionItem
    alwaysOpen={alwaysOpen}
    header={
      <div className="flex gap-4">
        <CircularProgress progress={progress} />
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
  readonly alwaysOpen?: boolean;
  readonly children?: ReactNode | undefined;
  readonly description: string;
  readonly progress: number;
  readonly title: string;
}
