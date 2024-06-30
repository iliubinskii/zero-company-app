import { AnimatedLink } from "../../components";
import type { ExistingCategory } from "../../schema";
import type { FC } from "react";
import React from "react";
import { images } from "../../images";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

export const Footer: FC<Props> = ({ categories }) => (
  <footer className="bg-light-gray-cold w-full">
    <nav>
      {/* Footer categories */}
      <section className="border-t-1.5 border-gray-300">
        <CategoriesContainer>
          <h3 className="uppercase font-semibold pt-6 px-6 pb-2 md:hidden">
            {lang.Explore}
          </h3>
          <ul
            className="
              px-6 md:px-12 py-6
              flex flex-col md:flex-row flex-wrap gap-x-3 gap-y-2 text-sm
            "
          >
            {categories.map(category => (
              <li key={category._id}>
                <AnimatedLink
                  className="inline-block whitespace-nowrap hover:underline hover:text-green-primary underline-offset-2"
                  href={`/categories/${category._id}`}
                >
                  {category.name}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </CategoriesContainer>
      </section>
      {/* Footer categories END */}

      {/* Footer link groups */}
      <section className="border-t-1.5 p-6">
        <LinksContainer>
          {footerLinkGroups.map(({ links, title }, key) => (
            <LinksColumn key={key}>
              <h3 className="uppercase font-bold">{title}</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-700">
                {links.map(({ href, text }) => (
                  <li key={href}>
                    <AnimatedLink
                      className="leading-4 hover:underline hover:text-green-primary underline-offset-2"
                      href={href}
                    >
                      {text}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </LinksColumn>
          ))}
        </LinksContainer>
      </section>
      {/* Footer link groups END */}
      {/* Footer Logo */}
      <section>
        <AnimatedLink href="/">
          <LogoContainer>
            <LogoIcon alt={lang.Logo} src={images.logoIcon.src} />
            <LogoHeader>ZERO COMPANY &#169; 2024</LogoHeader>
          </LogoContainer>
        </AnimatedLink>
      </section>
      {/* Footer Logo ends */}
      {/* Policies */}
      <section className="border-t-1.5 px-4 py-7">
        <ul className="mx-auto max-w-screen-2xl px-4 flex justify-center flex-wrap gap-4 md:gap-10 text-sm text-gray-700">
          {footerLinks.map(({ href, text }) => (
            <li key={href}>
              <AnimatedLink
                className="whitespace-nowrap hover:underline hover:text-green-primary underline-offset-2"
                href={href}
              >
                {text}
              </AnimatedLink>
            </li>
          ))}
        </ul>
      </section>
      {/* Policies END */}
    </nav>
  </footer>
);

const CategoriesContainer = tw.div`mx-auto max-w-screen-2xl`;

const LinksContainer = tw.div`
  mx-auto max-w-screen-2xl grid grid-cols-3 gap-4 pt-2 md:px-8 lg:px-40`;

const LinksColumn = tw.div`flex flex-col gap-6`;

const LogoContainer = tw.div`mx-auto max-w-screen-2xl flex gap-2 items-center p-6`;

const LogoIcon = tw.img`w-6 h-6 bg-white rounded-full`;

const LogoHeader = tw.h3`text-sm text-charcoal tracking-tighter`;

export interface Props {
  readonly categories: readonly ExistingCategory[];
}

const footerLinkGroups = [
  {
    links: [
      { href: "/knowledge/about", text: lang.AboutUs },
      { href: "/knowledge/charter", text: lang.OurCharter },
      { href: "/knowledge/team", text: lang.Team },
      { href: "/knowledge/jobs", text: lang.Jobs }
    ],
    title: lang.About
  },
  {
    links: [
      { href: "/knowledge/how-it-works", text: lang.HowZeroCompanyWorks },
      { href: "/knowledge/nda", text: lang.NDA },
      { href: "/knowledge/ip", text: lang.IpAgreement },
      { href: "/knowledge/shareholders", text: lang.FoundingAgreement },
      { href: "/knowledge/buy-sell", text: lang.BuySellAgreement },
      { href: "/knowledge/drag-along", text: lang.DragAlongRights },
      { href: "/knowledge/tag-along", text: lang.TagAlongRights },
      { href: "/knowledge/preemptive", text: lang.PreemptiveRights },
      { href: "/knowledge/rofr", text: lang.ROFR }
    ],
    title: lang.Legal
  },
  {
    links: [
      { href: "/knowledge/questions", text: lang.CommonQuestions },
      { href: "/knowledge/help", text: lang.HelpCenter },
      { href: "/knowledge/blog", text: lang.Blog },
      { href: "/knowledge/success", text: lang.SuccessStories }
    ],
    title: lang.Resources
  }
] as const;

const footerLinks = [
  { href: "/knowledge/terms", text: lang.TermsOfUse },
  { href: "/knowledge/privacy", text: lang.PrivacyPolicy },
  { href: "/knowledge/cookie-policy", text: lang.CookiePolicy },
  {
    href: "/knowledge/accessibility-statement",
    text: lang.AccessibilityStatement
  }
] as const;
