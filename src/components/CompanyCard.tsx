"use client";

import type { Company } from "../schema";
import React from "react";
import { assertDefined } from "../utils";

export const CompanyCard: React.FC<Props> = ({ className, company }) => {
  const image = assertDefined(company.images[0]);

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div
      className={`${className} ${isHovering ? "-m-6 relative z-10" : ""}`}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <div
        className={
          isHovering ? "px-6 pt-6 bg-white rounded-t-md shadow-lg" : ""
        }
      >
        <img
          alt={company.name}
          className="w-full"
          height={image.height}
          src={image.secureUrl}
          width={image.width}
        />
        {company.name}
      </div>
      <div
        className={`absolute left-0 right-0 rounded-b-md px-6 pb-6 bg-white shadow-lg ${isHovering ? "" : "hidden"}`.trim()}
      >
        <div className="text-sm">{company.description}</div>
      </div>
    </div>
  );
};

export interface Props {
  readonly className?: string | undefined;
  readonly company: Company;
}
