import {
  AnimatedLink,
  AsyncButton,
  ErrorAlert,
  InfoAlert
} from "../../../../components";
import {
  SnackbarVariant,
  logError,
  showSnackbar,
  useAppDispatch
} from "../../../../store";
import type { ExistingCompany } from "../../../../schema";
import type { FC } from "react";
import React from "react";
import { api } from "../../../../api";
import { lang } from "../../../../langs";
import { useAsyncCallback } from "../../../../hooks";

export const Signing: FC<Props> = ({ company, setCompany }) => {
  const dispatch = useAppDispatch();

  const { callback: submit, isLoading: isSubmitting } =
    useAsyncCallback(async () => {
      const updatedCompany = await api.generateFoundingAgreement(company._id);

      if ("error" in updatedCompany)
        dispatch(
          logError({
            error: updatedCompany,
            message: updatedCompany.errorMessage
          })
        );
      else {
        setCompany(updatedCompany);
        dispatch(
          showSnackbar({
            message: lang.GeneratedFoundingAgreement,
            variant: SnackbarVariant.success
          })
        );
      }
    }, [company._id, dispatch, setCompany]);

  return company.foundingAgreement ? (
    <div className="flex flex-col gap-11">
      <InfoAlert>{lang.app.profile.drafts.draft.Signing.infoAlert}</InfoAlert>
      <div className="flex justify-end">
        <AnimatedLink
          className="primary-button"
          href={`/profile/documents/${company.foundingAgreement}`}
        >
          {lang.ViewAgreement}
        </AnimatedLink>
      </div>
    </div>
  ) : (
    <form
      className="flex flex-col gap-11"
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <ErrorAlert>
        {lang.app.profile.drafts.draft.Signing.errorAlert}
      </ErrorAlert>
      <div className="flex justify-end">
        <AsyncButton
          className="primary-button"
          isLoading={isSubmitting}
          type="submit"
        >
          {lang.Generate}
        </AsyncButton>
      </div>
    </form>
  );
};

export interface Props {
  readonly company: ExistingCompany;
  readonly modified: boolean;
  readonly setCompany: (company: ExistingCompany) => void;
}
