import type { FC, FormEventHandler } from "react";
import {
  SNACKBAR_VARIANT,
  logError,
  showSnackbar,
  useAppDispatch
} from "../../../../store";
import type { ExistingCompany } from "../../../../schema";
import React from "react";
import { api } from "../../../../api";
import { callAsync } from "../../../../utils";
import { lang } from "../../../../langs";

export const Signing: FC<Props> = ({ company }) => {
  const dispatch = useAppDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    callAsync(async () => {
      const draft = await api.generateFoundingAgreement(company._id);

      if ("error" in draft)
        dispatch(logError({ error: draft, message: draft.errorMessage }));
      else
        dispatch(
          showSnackbar({
            message: lang.GeneratedFoundingAgreement,
            variant: SNACKBAR_VARIANT.success
          })
        );
    });
  };

  return (
    <form className="flex flex-col gap-11" onSubmit={onSubmit}>
      {/* Save button */}
      <div className="flex justify-end">
        <button className="primary-button" type="submit">
          {lang.Save}
        </button>
      </div>
      {/* Save button END */}
    </form>
  );
};

export interface Props {
  readonly company: ExistingCompany;
  readonly modified: boolean;
}
