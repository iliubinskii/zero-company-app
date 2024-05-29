"use client";

import { resetCompanyRegistration, useAppDispatch } from "../services";
import { AnimatedLink } from "../components";
import type Link from "next/link";
import React from "react";
import { lang } from "../langs";
import styles from "./CreateCompanyButton.module.css";

const CreateCompanyButton: React.FC<
  Omit<React.ComponentProps<typeof Link>, "href">
> = ({ className = "", ...props }) => {
  const dispatch = useAppDispatch();

  return (
    <AnimatedLink
      className={`${styles["link"]} ${className}`.trim()}
      {...props}
      href="/create-company"
      onBeforeClick={() => {
        dispatch(resetCompanyRegistration());
      }}
    >
      {lang.CreateCompany}
    </AnimatedLink>
  );
};

export default CreateCompanyButton;
