import type { ExistingCategory, ExistingCompany } from "../../schema";
import { ExpandableContent, MainContent } from "./helpers";
import type { FC } from "react";
import React from "react";

export const BigCompanyCard: FC<Props> = ({ categories, company }) => (
  <div>
    <MainContent company={company} />
    <ExpandableContent categories={categories} company={company} />
  </div>
);

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly company: ExistingCompany;
}
