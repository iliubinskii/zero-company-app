import { ExistingCategories, ExistingCompanies } from "../schema";
import { GetServerSideProps, NextPage } from "next";
import { getCategories, getCompanies } from "../api";
import Image from "next/image";
import Layout from "../Layout";
import React from "react";
import { assertDefined } from "../utils";
import { images } from "../images";
import { lang } from "../langs";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ categories, companies }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
    <Layout categories={categories}>
      <div className="self-center m-9 max-w-screen-lg flex flex-col gap-9">
        {/* Teaser */}
        <h2 className="text-center text-xl text-gray-500">
          {lang.home.teaser}
        </h2>
        {/* Teaser END */}

        {/* Cards */}
        <div className="grid grid-cols-3 gap-3">
          {cards.map(({ description, image, title }, key) => (
            <div className="rounded-xl overflow-hidden shadow-lg" key={key}>
              <Image
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

        {/* Featured companies */}
        <div className="-mx-1 carousel">
          {companies.map(company => (
            <div
              className="carousel-item w-1/4 min-w-1/4 px-1 flex-col"
              key={company.id}
            >
              <Image
                alt={company.name}
                className="w-full"
                height={900}
                priority
                src={assertDefined(company.images[0])}
                width={1600}
              />
              {company.name}
            </div>
          ))}
        </div>
        {/* Featured companies END */}

        {/* Companies */}
        {companies.map(company => (
          <div className="flex" key={company.id}>
            <Image
              alt={company.name}
              className="w-aspect-ratio-16/9 h-aspect-ratio-16/9"
              height={1600}
              src={assertDefined(company.images[0])}
              width={900}
            />
            {company.name}
          </div>
        ))}
        {/* Companies END */}
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [categories, companies] = await Promise.all([
    getCategories(),
    getCompanies()
  ]);

  return {
    props: { categories, companies }
  };
};

export interface Props {
  readonly categories: ExistingCategories;
  readonly companies: ExistingCompanies;
}
