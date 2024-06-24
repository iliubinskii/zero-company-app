"use client";

import type { ExistingCompanies } from "../../schema";
import type { NextPage } from "next";
import React from "react";
import { api } from "../../api";
import { useAsyncCallback } from "../../hooks";

// Use `src\app\categories\[id]\ClientPage.tsx` as a reference
// Do not work on infinite loading pagination

const Page: NextPage = () => {
  const [companies, setCompanies] = React.useState<ExistingCompanies>({
    count: 0,
    docs: [],
    total: 0
  });

  // eslint-disable-next-line no-unused-expressions -- Temp
  companies;
  // eslint-disable-next-line no-unused-expressions -- Temp
  setCompanies;

  const { callback: loadCompanies, isLoading } = useAsyncCallback(async () => {
    // Use `q` parameter
    const nextCompanies = await api.getCompanies();

    // 1. Check for errors
    // 2. Update state
    // eslint-disable-next-line no-unused-expressions -- Ok
    nextCompanies;
  }, []);

  // Show `BigSpinner` while loading
  // eslint-disable-next-line no-unused-expressions -- Temp
  isLoading;

  // Call it in useEffect
  // eslint-disable-next-line no-unused-expressions -- Temp
  loadCompanies;

  // eslint-disable-next-line no-warning-comments -- Ok
  // TODO:
  // - Get `q` from query string (on client side)
  //   import { useSearchParams } from 'next/navigation';
  // - Fetch companies with api.getCompanies

  return <></>;
};

export default Page;
