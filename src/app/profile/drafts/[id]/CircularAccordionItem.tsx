import { AccordionItem, CircularProgress } from "../../../../components";
import type { FC, ReactNode } from "react";
import React from "react";

export const CircularAccordionItem: FC<Props> = ({
  children,
  description,
  progress,
  title
}) => (
  <AccordionItem
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
  readonly children?: ReactNode | undefined;
  readonly description: string;
  readonly progress: number;
  readonly title: string;
}
