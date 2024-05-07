import { CompanyCard, Header2 } from "../components";
import { ExistingCompany, MultipleDocsResponse } from "../schema";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { getCompanies } from "../api";
import { images } from "../images";
import { lang } from "../langs";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ companies }) => {
  const router = useRouter();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

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
    <div className="flex flex-col gap-9">
      {/* Teaser */}
      <Header2 className="text-center">{lang.home.teaser}</Header2>
      {/* Teaser END */}

      {/* Cards */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map(({ description, image, title }, key) => (
          <div className="rounded-xl overflow-hidden shadow-lg" key={key}>
            <img
              alt={title}
              height={image.height}
              src={image.src}
              width={image.width}
            />
            <div className="px-6 py-4 flex flex-col gap-3">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="flex-grow text-gray-500">{description}</p>
              <button className="self-start rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                {lang.LearnMore}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Cards END */}

      {/* Companies */}
      <div className="-mx-1 carousel">
        {companies.docs.map(company => (
          <CompanyCard
            className="carousel-item w-1/4 min-w-1/4 px-1 flex-col"
            company={company}
            key={company._id}
          />
        ))}
      </div>
      {/* Companies END */}
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const companies = await getCompanies({ limit: 4 });

  return { props: { companies } };
};

export interface Props {
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
