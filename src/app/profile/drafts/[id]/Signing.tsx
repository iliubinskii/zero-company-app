import { AnimatedLink, ErrorAlert, InfoAlert } from "../../../../components";
import type { FC, FormEventHandler } from "react";
import {
  SnackbarVariant,
  logError,
  showSnackbar,
  useAppDispatch
} from "../../../../store";
import type { ExistingCompany } from "../../../../schema";
import React from "react";
import { api } from "../../../../api";
import { callAsync } from "../../../../utils";
import { lang } from "../../../../langs";

export const Signing: FC<Props> = ({ company, setCompany }) => {
  const dispatch = useAppDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    callAsync(async () => {
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
    });
  };

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
    <form className="flex flex-col gap-11" onSubmit={onSubmit}>
      <ErrorAlert>
        {lang.app.profile.drafts.draft.Signing.errorAlert}
      </ErrorAlert>
      <div className="flex justify-end">
        <button className="primary-button" type="submit">
          {lang.Generate}
        </button>
      </div>
    </form>
  );
};

export interface Props {
  readonly company: ExistingCompany;
  readonly modified: boolean;
  readonly setCompany: (company: ExistingCompany) => void;
}
