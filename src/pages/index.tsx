import { GetServerSideProps, NextPage } from "next";
import { GetCompaniesResponse } from "../schema";
import React from "react";
import { assertDefined } from "../utils";
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
      <h2 className="text-center text-xl text-gray-500">{lang.home.teaser}</h2>
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
        {companies.docs.map(company => {
          const { height, secureUrl, width } = assertDefined(company.images[0]);

          return (
            <div
              className="carousel-item w-1/4 min-w-1/4 px-1 flex-col"
              key={company._id}
            >
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
        })}
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
  readonly companies: GetCompaniesResponse;
}
