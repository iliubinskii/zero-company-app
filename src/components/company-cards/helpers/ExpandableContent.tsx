"use client";

import { BadgeButton } from "../../buttons/BadgeButton";
import type { ExistingCompany } from "../../../schema";
import React from "react";

export const ExpandableContent: React.FC<Props> = ({ company }) => (
  <div>
    <p className="pt-3 leading-7 tracking-wide">{company.description}</p>
    <div className="flex gap-3 justify-start items-center mt-3">
      <BadgeButton>Web & Mobile</BadgeButton>
      <BadgeButton>San-Francisco, USA</BadgeButton>
    </div>
  </div>
);

export interface Props {
  readonly company: ExistingCompany;
}
