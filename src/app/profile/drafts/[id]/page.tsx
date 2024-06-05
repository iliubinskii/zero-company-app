"use client";

import { ErrorCode, type ExistingCompany } from "../../../../schema";
import { ProfileLayout, Snackbar } from "../../../../components";
import { assertDefined, callAsync, createPage } from "../../../../utils";
import React, { useEffect, useState } from "react";
import { getCompany } from "../../../../api";
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
      const result = await getCompany(id);

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

  if (isLoading) return <ProfileLayout>{lang.Loading}</ProfileLayout>;

  return (
    <>
      <ProfileLayout>{JSON.stringify(company)}</ProfileLayout>
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
