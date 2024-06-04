import type { FC, HTMLAttributes } from "react";
import type { Company } from "../schema";
import React from "react";
import { assertDefined } from "../utils";

export const CompanyCard: FC<Props> = ({ company, ...props }) => {
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

export interface Props extends HTMLAttributes<HTMLDivElement> {
  readonly company: Company;
}
