import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../../components";
import React from "react";
import { Yanone_Kaffeesatz } from "next/font/google";
import { images } from "../../images";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO:
// Use tw styled component for img
// Start sentence with a capital letter
// Add space before *}
// Remove redundant template literal {`${yanone.className} `}
// alt="logo" - Move "logo" text to lang file, start with a capital letter
const Logo: FC<
  Omit<ComponentProps<typeof AnimatedLink>, "className" | "href">
> = props => (
  <AnimatedLink className={"flex items-center gap-2"} href="/" {...props}>
    {/* icon was downloaded for free from https://icons8.com/ with condition to make a link in HTML code like this:*/}
    {/* <a target="_blank" href="https://icons8.com/icon/113566/digi-id">Digi Id</a> иконка от <a target="_blank" href="https://icons8.com">Icons8</a>*/}
    {/* So need to replace*/}
    <img
      alt="logo"
      className="w-8 h-8 bg-white rounded-full sm:hidden"
      src={images.logoIcon.src}
    />
    <Text className={`${yanone.className} `}>
      {lang.ZeroCompany.toUpperCase()}
    </Text>
  </AnimatedLink>
);

export default Logo;

const Text = tw.h1`pt-2 whitespace-nowrap text-[2rem] hidden sm:block`;

const yanone = Yanone_Kaffeesatz({ subsets: ["latin"], weight: "400" });
