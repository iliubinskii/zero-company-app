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
  page: () => React.ReactElement
): NextPage<PageProps> {
  return () => {
    console.info(`Compiled ${pageName}`);

    return page();
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
  return ({ params = defaultParams, ...props }) => {
    const dynamicPageName = Object.entries(params).reduce(
      (accumulator, [key, value]) => accumulator.replace(`[${key}]`, value),
      pageName
    );

    console.info(`Compiled ${dynamicPageName}`);

    return page({ params, ...props });
  };
}

export interface PageProps {
  readonly params?: Readonly<Record<string, string>>;
}

const defaultParams: Readonly<Record<string, string>> = {};
