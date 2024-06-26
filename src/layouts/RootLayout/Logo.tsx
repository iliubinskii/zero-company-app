import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../../components";
import React from "react";
import { Yanone_Kaffeesatz } from "next/font/google";
import { images } from "../../images";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

export const Logo: FC<
  Omit<ComponentProps<typeof AnimatedLink>, "className" | "href">
> = props => (
  <AnimatedLink className={"flex items-center gap-2"} href="/" {...props}>
    {/* Icon was downloaded for free from https://icons8.com/ with condition to make a link in HTML code like this: */}
    {/* <a target="_blank" href="https://icons8.com/icon/113566/digi-id">Digi Id</a> иконка от <a target="_blank" href="https://icons8.com">Icons8</a> */}
    {/* So need to replace */}
    <LogoImage alt={lang.Logo} src={images.logoIcon.src} />
    <Text className={yanone.className}>{lang.ZeroCompany.toUpperCase()}</Text>
  </AnimatedLink>
);

const Text = tw.h1`pt-2 whitespace-nowrap text-[2rem] hidden sm:block`;

const LogoImage = tw.img`w-8 h-8 bg-white rounded-full sm:hidden`;

const yanone = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });
