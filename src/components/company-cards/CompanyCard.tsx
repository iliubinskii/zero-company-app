import { ExpandableContent, MainContent } from "./helpers";
import type { ExistingCompany } from "../../schema";
import { ExpandableCard } from "../ExpandableCard";
import React from "react";

export const CompanyCard: React.FC<Props> = ({ company }) => (
  <ExpandableCard expandable={<ExpandableContent company={company} />}>
    <MainContent company={company} />
  </ExpandableCard>
);

export interface Props {
  readonly company: ExistingCompany;
}
