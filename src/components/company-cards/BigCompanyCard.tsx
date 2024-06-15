import { ExpandableContent, MainContent } from "./helpers";
import type { ExistingCompany } from "../../schema";
import type { FC } from "react";
import React from "react";

export const BigCompanyCard: FC<Props> = ({ company }) => (
  <div>
    <MainContent company={company} />
    <ExpandableContent company={company} />
  </div>
);

export interface Props {
  readonly company: ExistingCompany;
}
