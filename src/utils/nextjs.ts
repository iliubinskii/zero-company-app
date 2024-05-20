import type { NextPage } from "next";
import type React from "react";

/**
 * Create an async page.
 * @param pageName - Page name.
 * @param page - Page.
 * @returns Wrapped page.
 */
export function createAsyncPage(
  pageName: string,
  page: (props: PageProps) => Promise<React.ReactElement>
): NextPage<PageProps> {
  return async ({ params = defaultParams, ...props }) => {
    const dynamicPageName = Object.entries(params).reduce(
      (accumulator, [key, value]) => accumulator.replace(`[${key}]`, value),
      pageName
    );

    const t1 = performance.now();

    const element = await page({ params, ...props });

    const t2 = performance.now();

    console.info(`Render ${dynamicPageName} in ${Math.round(t2 - t1)} ms`);

    return element;
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
  page: (props: PageProps) => React.ReactElement
): NextPage<PageProps> {
  return ({ params = defaultParams, ...props }) => {
    const dynamicPageName = Object.entries(params).reduce(
      (accumulator, [key, value]) => accumulator.replace(`[${key}]`, value),
      pageName
    );

    const t1 = performance.now();

    const element = page({ params, ...props });

    const t2 = performance.now();

    console.info(`Render ${dynamicPageName} in ${Math.round(t2 - t1)} ms`);

    return element;
  };
}

export interface PageProps {
  readonly params?: Readonly<Record<string, string>>;
}

const defaultParams: Readonly<Record<string, string>> = {};
