import { ExistingCategories, ExistingCompanies } from "../schema";
import { API_URL } from "../config";
import { Bebas_Neue } from "next/font/google";
import { HiSearch } from "react-icons/hi";
import Image from "next/image";
import React from "react";
import { t } from "i18next";
/**
 * Home page component.
 * @returns The rendered component.
 */
export default async function Home() {
  const [categories, companies] = await Promise.all([
    getCategories(),
    getCompanies()
  ]);

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2">
          <Image
            alt="App Logo"
            className="app-logo-image"
            height={858}
            priority
            src="/app-logo.png"
            width={820}
          />
          <h1 className={`${bebas.className} app-logo-text`}>
            {t("ZeroCompany")}
          </h1>
        </div>
        <div className="relative flex-grow">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="w-full border border-gray-300 rounded-md shadow pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={t("searchPlaceholder")}
            type="search"
          />
        </div>
      </div>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
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
