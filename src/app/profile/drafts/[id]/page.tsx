"use client";

import { ErrorCode, type ExistingCompany } from "../../../../schema";
import { assertDefined, callAsync, createPage } from "../../../../utils";
import React, { useEffect, useState } from "react";
import { api } from "../../../../api";
import { lang } from "../../../../langs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "../../../../contexts";

const Page = createPage("/categories/[id]", ({ params = {} }) => {
  const [company, setCompany] = useState<ExistingCompany>();

  const id = assertDefined(params["id"]);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    callAsync(async () => {
      const result = await api.getCompany(id);

      setIsLoading(false);

      if ("error" in result)
        if (result.error === ErrorCode.NotFound) router.push("/profile/drafts");
        else showSnackbar(result.errorMessage, "error");
      else setCompany(result);
    });
  }, [id, router, showSnackbar]);

  if (isLoading) return <>{lang.Loading}</>;

  return <>{JSON.stringify(company)}</>;
});

export default Page;
