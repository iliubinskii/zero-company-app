"use client";

import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../components";
import { Bebas_Neue } from "next/font/google";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

const Logo: FC<Omit<ComponentProps<typeof Link>, "href">> = props => (
  <Link href="/" {...props}>
    <Image
      alt={lang.ZeroCompany}
      height={images.appLogo.height}
      src={images.appLogo.src}
      width={images.appLogo.width}
    />
    <Text className={bebas.className}>{lang.ZeroCompany}</Text>
  </Link>
);

export default Logo;

const Link = tw(AnimatedLink)`flex items-center gap-2`;

const Image = tw.img`w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem]`;

const Text = tw.h1`text-[1.5rem] sm:text-[2rem]`;

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
