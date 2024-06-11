"use client";

import { BadgeButton } from "../../buttons/BadgeButton";
import type { ExistingCompany } from "../../../schema";
import { FaRegBookmark } from "react-icons/fa6";
import React from "react";

export const ExpandableContent: React.FC<Props> = ({ company }) => (
  <>
    <div className="px-2 flex gap-4">
      <div className="w-10 min-w-10" />
      <div className="grow flex flex-col">
        <p className="pt-3 leading-7 tracking-wide">{company.description}</p>
        <div className="flex gap-3 justify-start items-center mt-3">
          <BadgeButton>Web & Mobile</BadgeButton>
          <BadgeButton>San-Francisco, USA</BadgeButton>
        </div>
      </div>
      <FaRegBookmark className="text-lg opacity-0 pointer-events-none select-none" />
    </div>
  </>
);

export interface Props {
  readonly company: ExistingCompany;
}
