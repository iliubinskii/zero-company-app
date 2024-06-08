import {
  CompanyCard,
  CompanyCards,
  InfoCard,
  InfoCards,
  PageLayout
} from "../components";
import { CompanyStatus } from "../schema";
import React from "react";
import { api } from "../api";
import { createAsyncPage } from "../utils";
import { images } from "../images";
import { lang } from "../langs";

const Page = createAsyncPage("/", async () => {
  const companies = await api.getCompaniesSrv({
    limit: 3,
    sortBy: "foundedAt",
    sortOrder: "desc",
    status: CompanyStatus.founded
  });

  const cards = [
    {
      description: lang.home.card1.description,
      image: images.digitalSign,
      title: lang.home.card1.title
    },
    {
      description: lang.home.card2.description,
      image: images.IPO,
      title: lang.home.card2.title
    },
    {
      description: lang.home.card3.description,
      image: images.unicorn,
      title: lang.home.card3.title
    }
  ];

  return (
    <PageLayout size="lg">
      <div className="header2 text-center">{lang.home.teaser}</div>
      <InfoCards>
        {cards.map(({ description, image, title }, key) => (
          <InfoCard
            description={description}
            image={image.src}
            imageHeight={image.height}
            imageWidth={image.width}
            key={key}
            title={title}
          />
        ))}
      </InfoCards>
      <CompanyCards>
        {companies.docs.map(company => (
          <CompanyCard company={company} key={company._id} />
        ))}
      </CompanyCards>
    </PageLayout>
  );
});

export default Page;
