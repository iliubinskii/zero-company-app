import type { ExistingCategory, ExistingCompany } from "../../../../schema";
import type { FC } from "react";
import React from "react";

export const Basics: FC<Props> = () => <>Under construction</>;

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly company: ExistingCompany;
}
