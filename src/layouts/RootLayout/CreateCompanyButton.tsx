import type { ComponentProps, FC } from "react";
import { resetCompanyRegistration, useAppDispatch } from "../../store";
import { AnimatedLink } from "../../components";
import React from "react";
import { lang } from "../../langs";

const CreateCompanyButton: FC<
  Omit<ComponentProps<typeof AnimatedLink>, "className" | "href" | "onClick">
> = props => {
  const dispatch = useAppDispatch();

  return (
    <AnimatedLink
      className={`
        rounded-lg px-4 py-3 bg-green-primary
        whitespace-nowrap text-white
        hover:bg-green-secondary
        transition
      `}
      href="/create-company"
      onClick={() => {
        dispatch(resetCompanyRegistration());
      }}
      {...props}
    >
      {lang.StartCompany2[0]}
      <span className="hidden sm:inline">{lang.StartCompany2[1]}</span>
    </AnimatedLink>
  );
};

export default CreateCompanyButton;
