import { resetCompanyRegistration, useAppDispatch } from "../../store";
import { AnimatedLink } from "../../components";
import type { FC } from "react";
import React from "react";
import { lang } from "../../langs";

const CreateCompanyButton: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <AnimatedLink
      className={`
        rounded-lg px-4 py-2 bg-green-primary
        whitespace-nowrap text-white
        hover:bg-green-secondary
        transition text-sm
      `}
      href="/create-company"
      onClick={() => {
        dispatch(resetCompanyRegistration());
      }}
    >
      {lang.StartCompany2[0]}
      <span className="hidden sm:inline">{lang.StartCompany2[1]}</span>
    </AnimatedLink>
  );
};

export default CreateCompanyButton;
