import { ExpandableContent, MainContent } from "./helpers";
import type { ExistingCompany } from "../../schema";
import { ExpandableCard } from "../ExpandableCard";
import type { FC } from "react";
import React from "react";

export const CompanyCard: FC<Props> = ({ company }) => (
  <ExpandableCard expandable={<ExpandableContent company={company} />}>
    <MainContent company={company} />
  </ExpandableCard>
);

export interface Props {
  readonly company: ExistingCompany;
}
