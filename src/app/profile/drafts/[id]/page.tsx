"use client";

import { ErrorCode, type ExistingCompany } from "../../../../schema";
import { assertDefined, callAsync, createPage } from "../../../../utils";
import React, { useEffect, useState } from "react";
import { Snackbar } from "../../../../components";
import { api } from "../../../../api";
import { lang } from "../../../../langs";
import { useRouter } from "next/navigation";

const Page = createPage("/categories/[id]", ({ params = {} }) => {
  const [company, setCompany] = useState<ExistingCompany>();

  const [errorMessage, setErrorMessage] = useState("");

  const id = assertDefined(params["id"]);

  const [isLoading, setIsLoading] = useState(true);

  const [isSnackbarActive, setIsSnackbarActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    callAsync(async () => {
      const result = await api.getCompany(id);

      setIsLoading(false);

      if ("error" in result)
        if (result.error === ErrorCode.NotFound) router.push("/profile/drafts");
        else {
          setErrorMessage(result.errorMessage);
          setIsSnackbarActive(true);
        }
      else setCompany(result);
    });
  }, [id, router]);

  if (isLoading) return <>{lang.Loading}</>;

  return (
    <>
      {JSON.stringify(company)}
      <Snackbar
        isOpen={isSnackbarActive}
        message={errorMessage}
        onClose={() => {
          setIsSnackbarActive(false);
        }}
        variant="error"
      />
    </>
  );
});

export default Page;
