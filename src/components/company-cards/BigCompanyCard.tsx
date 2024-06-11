import { ExpandableContent, MainContent } from "./helpers";
import type { ExistingCompany } from "../../schema";
import React from "react";

export const BigCompanyCard: React.FC<Props> = ({ company }) => (
  <div>
    <MainContent company={company} />
    <ExpandableContent company={company} />
  </div>
);

export interface Props {
  readonly company: ExistingCompany;
}
