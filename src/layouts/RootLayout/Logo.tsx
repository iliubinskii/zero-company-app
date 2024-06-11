"use client";

import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../../components";
import React from "react";
import { Yanone_Kaffeesatz } from "next/font/google";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const Logo: FC<Omit<ComponentProps<typeof Link>, "href">> = props => (
  <Link href="/" {...props}>
    <Text className={`${yanone.className} `}>
      {lang.ZeroCompany.toUpperCase()}
    </Text>
  </Link>
);

export default Logo;

const Link = tw(AnimatedLink)`flex items-center gap-2`;

const Text = tw.h1`text-[1.5rem] sm:text-[2rem] pt-2 whitespace-nowrap`;

const yanone = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });
