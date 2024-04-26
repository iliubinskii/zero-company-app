import { ExistingCategories, ExistingCompanies } from "../schema";
import { API_URL } from "../config";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { Typography } from "@mui/material";
import { images } from "../images";
import { lang } from "../langs";

/**
 * Home page component.
 * @returns The rendered component.
 */
export default async function Home(): Promise<React.ReactElement> {
  const [categories, companies] = await Promise.all([
    getCategories(),
    getCompanies()
  ]);

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
      {/* Header */}
      <div className="border header-border-width flex flex-col p-5 gap-5">
        {/* Main header */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              alt={lang.ZeroCompany}
              className="app-logo-image"
              height={images.appLogo.height}
              priority
              src={images.appLogo.src}
              width={images.appLogo.width}
            />
            <h1 className={`${bebas.className} app-logo-text text-blue-700`}>
              {lang.ZeroCompany}
            </h1>
          </div>
          {/* Logo END */}

          {/* Site search */}
          <div className="relative flex-grow">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-700" />
            <input
              className="w-full border border-gray-300 rounded-lg shadow-lg pl-12 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={lang.header.searchPlaceholder}
              type="search"
            />
          </div>
          {/* Site search END */}

          {/* Create company */}
          <button className="px-4 py-3 rounded border border-gray-400 transition duration-150 ease-in-out hover:border-black focus:border-black">
            {lang.CreateCompany}
          </button>
          {/* Create company END */}

          {/* Log in */}
          <button className="px-2 py-3 transition-colors duration-150 hover:text-green-800">
            {lang.LogIn}
          </button>
          {/* Log in END */}
        </div>
        {/* Main header END */}

        {/* Categories */}
        <div className="flex justify-center gap-4 font-medium">
          {categories.map(category => (
            <div key={category.id}>{category.name}</div>
          ))}
        </div>
        {/* Categories END */}
      </div>
      {/* Header END */}

      {/* Teaser */}
      <Typography className="flex justify-center" variant="h5">
        {lang.home.teaser}
      </Typography>
      {/* Teaser END */}

      {/* Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-3">
          {cards.map(({ description, image, title }, key) => (
            <div
              className="max-w-xs rounded-2xl overflow-hidden shadow-lg"
              key={key}
            >
              <Image
                alt={title}
                height={image.height}
                src={image.src}
                width={image.width}
              />
              <div className="py-4 px-6 flex flex-col gap-3">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="flex-grow text-gray-500">{description}</p>
                <button className="self-start rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                  {lang.LearnMore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Cards END */}

      {/* Companies */}
      {companies.map(company => (
        <div key={company.id}>
          {company.name}
          <Image
            alt={company.name}
            height={100}
            priority
            src={company.logo}
            width={100}
          />
        </div>
      ))}
      {/* Companies END */}
    </div>
  );
}

/**
 * Retrieves the categories from the API.
 * @returns The categories.
 */
async function getCategories(): Promise<ExistingCategories> {
  const response = await fetch(`${API_URL}categories`);

  // eslint-disable-next-line no-warning-comments -- Postponed
  /**
   * TODO: Validate the response.
   */
  const categories = await response.json();

  return categories;
}

/**
 * Retrieves the companies from the API.
 * @returns The companies.
 */
async function getCompanies(): Promise<ExistingCompanies> {
  const response = await fetch(`${API_URL}companies`);

  // eslint-disable-next-line no-warning-comments -- Postponed
  /**
   * TODO: Validate the response.
   */
  const companies = await response.json();

  return companies;
}

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
