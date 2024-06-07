import type { NextPage } from "next";
import type { ReactElement } from "react";
import { logger } from "../services";

/**
 * Create an async page.
 * @param pageName - Page name.
 * @param page - Page.
 * @returns Wrapped page.
 */
export function createAsyncPage(
  pageName: string,
  page: (props: PageProps) => Promise<ReactElement>
): NextPage<PageProps> {
  return async ({ params = defaultParams, ...props }) => {
    const dynamicPageName = Object.entries(params).reduce(
      (accumulator, [key, value]) => accumulator.replace(`[${key}]`, value),
      pageName
    );

    const t1 = performance.now();

    const element = await page({ params, ...props });

    const t2 = performance.now();

    // eslint-disable-next-line i18n-text/no-en -- Ok
    logger.info(`Render '${dynamicPageName}' in ${Math.round(t2 - t1)} ms`);

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
  page: (props: PageProps) => ReactElement
): NextPage<PageProps> {
  return ({ params = defaultParams, ...props }) => {
    const dynamicPageName = Object.entries(params).reduce(
      (accumulator, [key, value]) => accumulator.replace(`[${key}]`, value),
      pageName
    );

    const t1 = performance.now();

    const element = page({ params, ...props });

    const t2 = performance.now();

    // eslint-disable-next-line i18n-text/no-en -- Ok
    logger.info(`Render '${dynamicPageName}' in ${Math.round(t2 - t1)} ms`);

    return element;
  };
}

export interface PageProps {
  readonly params?: Readonly<Record<string, string>> | undefined;
  readonly searchParams?: Readonly<Record<string, string>> | undefined;
}

const defaultParams: Readonly<Record<string, string>> = {};
