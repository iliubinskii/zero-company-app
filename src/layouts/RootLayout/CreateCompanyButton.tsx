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
        rounded-lg px-4 py-3 
        text-base
        whitespace-nowrap text-white border
        hover:text-charcoal hover:bg-white
        transition
      `}
      href="/create-company"
      onClick={() => {
        dispatch(resetCompanyRegistration());
      }}
    >
      {lang.StartCompany2[0]}
      <span className="">{lang.StartCompany2[1]}</span>
    </AnimatedLink>
  );
};

export default CreateCompanyButton;
