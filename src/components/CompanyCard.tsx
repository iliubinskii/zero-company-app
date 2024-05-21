import type { Company } from "../schema";
import React from "react";
import { assertDefined } from "../utils";

export const CompanyCard: React.FC<Props> = ({ company, ...props }) => {
  const { height, secureUrl, width } = assertDefined(company.images[0]);

  return (
    <div {...props}>
      <img
        alt={company.name}
        className="w-full"
        height={height}
        src={secureUrl}
        width={width}
      />
      {company.name}
    </div>
  );
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly company: Company;
}
