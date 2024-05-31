import { startCompanyRegistration, useAppDispatch } from "../../services";
import { BlocksLayout } from "../../components";
import type { FC } from "react";
import React from "react";
import { lang } from "../../langs";

export const Start: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <BlocksLayout>
      <form
        className="py-32 flex flex-col items-center"
        onSubmit={e => {
          e.preventDefault();
          dispatch(startCompanyRegistration());
        }}
      >
        <button className="dark-button" type="submit">
          {lang.CreateCompany}
        </button>
      </form>
    </BlocksLayout>
  );
};
