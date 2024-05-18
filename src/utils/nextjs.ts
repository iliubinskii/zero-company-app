import { NextPage } from "next";
import React from "react";

/**
 * Create a client page.
 * @param pageName - Page name.
 * @param page - Page.
 * @returns Wrapped page.
 */
export function createClientPage(
  pageName: string,
  page: (props: PageProps) => React.ReactElement
): NextPage<PageProps> {
  return props => {
    console.info(`Rendered ${pageName}`);

    return page(props);
  };
}

/**
 * Create a page.
 * @param pageName - Page name.
 * @param page - Page.
 * @returns Wrapped page.
 */
export function createPage(
  pageName: string,
  page: (props: PageProps) => React.ReactElement | Promise<React.ReactElement>
): NextPage<PageProps> {
  return async ({ params, ...props }) => {
    const dynamicPageName = Object.entries(params).reduce(
      (accumulator, [key, value]) => accumulator.replace(`[${key}]`, value),
      pageName
    );

    console.info(`Compiled ${dynamicPageName}`);

    const element = await page({ params, ...props });

    return element;
  };
}

export interface PageProps {
  readonly params: Record<string, string>;
}
