import { Company } from "../schema";
import React from "react";
import { assertDefined } from "../utils";

export const CompanyCard: React.FC<{
  readonly className?: string | undefined;
  readonly company: Company;
}> = ({ className, company }) => {
  const { height, secureUrl, width } = assertDefined(company.images[0]);

  return (
    <div className={className}>
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
