"use client";

import { assertDefined, callAsync } from "../../../../utils";
import {
  refreshDocument,
  selectAuthUser,
  useAppDispatch,
  useAppSelector
} from "../../../../store";
import { AuthGuard } from "../../../../components";
import { DocusealForm } from "@docuseal/react";
import { ERROR } from "../../../../consts";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import { ProfileLayout } from "../../../../layouts";
import React from "react";
import { api } from "../../../../api";
import { useAuthGuardedLoader } from "../../../../hooks";

const Page: NextPage<NextPageProps> = ({ params = {} }) => {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

  const id = assertDefined(params["id"], ERROR.EXPECTING_DOCUMENT_ID_PARAM);

  const {
    isLoading,
    resource: document,
    setResource: setDocument
  } = useAuthGuardedLoader(async () => api.getDocument(id), [id], {
    redirectOnNotFound: "/profile/documents"
  });

  return (
    <AuthGuard customLoading={isLoading}>
      <ProfileLayout>
        {authUser && document && (
          <>
            {document.doc.signatures
              .filter(signature => signature.email === authUser.email)
              .map(signature => (
                <DocusealForm
                  email={signature.email}
                  key={signature.email}
                  onComplete={() => {
                    callAsync(async () => {
                      const updatedDocument = await dispatch(
                        refreshDocument(document._id)
                      );

                      if (updatedDocument) setDocument(updatedDocument);
                    });
                  }}
                  src={signature.embedSrc}
                />
              ))}
          </>
        )}
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
