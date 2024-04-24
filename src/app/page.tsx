import { ExistingCategories, ExistingCompanies } from "../schema";
import { API_URL } from "../config";
import Image from "next/image";
import React from "react";

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
      <Image src="/next.svg" alt="Next Logo" width={100} height={24} priority />
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
      {companies.map(company => (
        <div key={company.id}>
          {company.name}
          <Image
            src={company.logo}
            alt={company.name}
            width={100}
            height={100}
            priority
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
