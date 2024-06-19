import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../../components";
import React from "react";
import { Yanone_Kaffeesatz } from "next/font/google";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const Logo: FC<
  Omit<ComponentProps<typeof AnimatedLink>, "className" | "href">
> = props => (
  <AnimatedLink className={"flex items-center gap-2"} href="/" {...props}>
    <Text className={`${yanone.className} `}>
      {lang.ZeroCompany.toUpperCase()}
    </Text>
  </AnimatedLink>
);

export default Logo;

const Text = tw.h1`text-[1.5rem] pt-2 whitespace-nowrap xl:text-[2rem]`;

const yanone = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });
