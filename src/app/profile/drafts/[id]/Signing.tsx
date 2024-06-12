import type { ExistingCompany } from "../../../../schema";
import type { FC } from "react";
import React from "react";
import { lang } from "../../../../langs";

export const Signing: FC<Props> = () => (
  <form className="flex flex-col gap-11">
    {/* Save button */}
    <div className="flex justify-end">
      <button className="primary-button" type="submit">
        {lang.Save}
      </button>
    </div>
    {/* Save button END */}
  </form>
);

export interface Props {
  readonly company: ExistingCompany;
  readonly modified: boolean;
}
