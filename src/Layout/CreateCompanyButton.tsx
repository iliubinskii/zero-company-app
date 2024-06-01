"use client";

import type { ComponentProps, FC } from "react";
import { resetCompanyRegistration, useAppDispatch } from "../services";
import { AnimatedLink } from "../components";
import React from "react";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

const CreateCompanyButton: FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  className = "",
  ...props
}) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      className={className}
      {...props}
      href="/create-company"
      onBeforeClick={() => {
        dispatch(resetCompanyRegistration());
      }}
    >
      {lang.CreateCompany}
    </Link>
  );
};

export default CreateCompanyButton;

const Link = tw(AnimatedLink)`
  px-4 py-3
  rounded
  border border-gray-400
  whitespace-nowrap
  transition duration-150 ease-in-out
  hover:border-black
  focus:border-black;
`;
