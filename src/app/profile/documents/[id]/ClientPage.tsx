"use client";

import {
  refreshDocument,
  selectAuthUser,
  useAppDispatch,
  useAppSelector
} from "../../../../store";
import { AuthGuard } from "../../../../components";
import { DocusealForm } from "@docuseal/react";
import type { FC } from "react";
import { ProfileLayout } from "../../../../layouts";
import React from "react";
import { api } from "../../../../api";
import { callAsync } from "../../../../utils";
import { useAuthGuardedLoader } from "../../../../hooks";

export const ClientPage: FC<Props> = ({ id }) => {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

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

export interface Props {
  readonly id: string;
}
