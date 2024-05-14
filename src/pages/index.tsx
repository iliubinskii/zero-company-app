import {
  BlocksLayout,
  CompanyCard,
  CompanyCards,
  Fallback,
  Header2,
  InfoCard,
  InfoCards
} from "../components";
import { ExistingCompany, MultipleDocsResponse } from "../schema";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";
import { serverAPI } from "../api";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ companies }) => {
  const router = useRouter();

  if (router.isFallback) return <Fallback />;

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
    <BlocksLayout wide>
      <Header2 className="text-center">{lang.home.teaser}</Header2>
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
    </BlocksLayout>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const companies = await serverAPI.getCompanies({ limit: 3 });

  return { props: { companies } };
};

export interface Props {
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
