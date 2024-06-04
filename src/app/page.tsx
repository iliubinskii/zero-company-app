import { BlocksLayout, CompanyCard, CompanyCards } from "../components";
import React from "react";
import { createAsyncPage } from "../utils";
import { getCompanies } from "../api";
import { lang } from "../langs";

const Page = createAsyncPage("/", async () => {
  const companies = await getCompanies({
    limit: 3,
    sortBy: "foundedAt",
    sortOrder: "desc"
  });

  return (
    <BlocksLayout size="lg">
      <div className="header2 text-center">{lang.home.teaser}</div>
      {/* Slogan */}
      {/* Slogan END */}

      {/* Elevated block with number */}
      {/* Elevated block with number END */}

      {/* Text block */}
      {/* Not sure (optional) */}
      {/* Text block END*/}

      {/* Two cols */}
      <div className="flex">
        {/* Featured companies */}
        {/* OPTIONS: (A) Use existing CompanyCard component; (B) Create big card variant after kickstarter */}
        {/* Featured companies END */}

        {/* Internships */}
        {/* Internships END */}
      </div>
      {/* Two cols END */}

      <CompanyCards>
        {companies.docs.map(company => (
          <CompanyCard company={company} key={company._id} />
        ))}
      </CompanyCards>
    </BlocksLayout>
  );
});

export default Page;
