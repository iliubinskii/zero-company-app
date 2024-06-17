import type { ExistingCategory, ExistingCompany } from "../../schema";
import { ExpandableContent, MainContent } from "./helpers";
import { ExpandableCard } from "../ExpandableCard";
import type { FC } from "react";
import React from "react";

export const CompanyCard: FC<Props> = ({ categories, company }) => (
  <ExpandableCard
    expandable={<ExpandableContent categories={categories} company={company} />}
  >
    <MainContent company={company} />
  </ExpandableCard>
);

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly company: ExistingCompany;
}
