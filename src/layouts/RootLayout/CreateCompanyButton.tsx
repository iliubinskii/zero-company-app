"use client";

import type { ComponentProps, FC } from "react";
import { resetCompanyRegistration, useAppDispatch } from "../../store";
import { AnimatedLink } from "../../components";
import React from "react";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const CreateCompanyButton: FC<
  Omit<ComponentProps<typeof Link>, "href">
> = props => {
  const dispatch = useAppDispatch();

  return (
    <Link
      href="/create-company"
      onBeforeClick={() => {
        dispatch(resetCompanyRegistration());
      }}
      {...props}
    >
      {lang.CreateCompany2[0]}
      <span className="hidden sm:inline">{lang.CreateCompany2[1]}</span>
    </Link>
  );
};

export default CreateCompanyButton;

const Link = tw(AnimatedLink)`
  rounded-lg px-4 py-3 bg-green-primary
  whitespace-nowrap text-white
  hover:bg-green-secondary
  transition;
`;
