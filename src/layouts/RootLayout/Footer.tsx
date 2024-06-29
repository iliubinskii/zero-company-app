import { AnimatedLink } from "../../components";
import type { ExistingCategory } from "../../schema";
import type { FC } from "react";
import React from "react";
import { images } from "../../images";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

export const Footer: FC<Props> = ({ categories }) => (
  <FooterContainer>
    <nav>
      {/* Footer categories */}
      <FooterCategoriesWrapper>
        <FooterCategoriesContainer>
          <FooterCategoriesHeader>{lang.Explore}</FooterCategoriesHeader>
          <ul>
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
        </FooterCategoriesContainer>
      </FooterCategoriesWrapper>
      {/* Footer categories END */}

      {/* Footer link groups */}
      <FooterLinksWrapper>
        <FooterLinksContainer>
          {footerLinkGroups.map(({ links, title }, key) => (
            <FooterLinksColumn key={key}>
              <FooterLinksHeader>{title}</FooterLinksHeader>
              <FooterLinksList>
                {links.map(({ href, text }) => (
                  <li key={href}>
                    <AnimatedLink
                      className="hover:underline hover:text-green-primary underline-offset-2"
                      href={href}
                    >
                      {text}
                    </AnimatedLink>
                  </li>
                ))}
              </FooterLinksList>
            </FooterLinksColumn>
          ))}
        </FooterLinksContainer>
      </FooterLinksWrapper>
      {/* Footer link groups END */}
      {/* Footer Logo */}
      <section>
        <AnimatedLink href="/">
          <FooterLogoContainer>
            <FooterLogoIcon alt={lang.Logo} src={images.logoIcon.src} />
            <FooterLogoHeader>ZERO COMPANY &#169; 2024</FooterLogoHeader>
          </FooterLogoContainer>
        </AnimatedLink>
      </section>
      {/* Footer Logo ends */}
      {/* Footer links */}
      <FooterPolicyLinksWrapper>
        <FooterPolicyLinksList>
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
        </FooterPolicyLinksList>
      </FooterPolicyLinksWrapper>
      {/* Footer links END */}
    </nav>
  </FooterContainer>
);

const FooterContainer = tw.footer`bg-light-gray-cold w-full`;

const FooterCategoriesWrapper = tw.section`border-t-1.5 border-gray-300`;

const FooterCategoriesContainer = tw.div`
  mx-auto max-w-screen-2xl px-6 md:px-12 py-5 flex 
  flex-col md:flex-row flex-wrap gap-x-3 gap-y-1 text-sm
`;

const FooterCategoriesHeader = tw.h3`uppercase font-semibold mb-3 md:hidden`;

const FooterLinksWrapper = tw.section`border-t-1.5 p-4`;

const FooterLinksContainer = tw.div`
  mx-auto max-w-screen-2xl flex justify-between gap-2 px-2 md:px-8 lg:px-40`;

const FooterLinksColumn = tw.div`flex flex-col gap-4`;

const FooterLinksHeader = tw.h3`uppercase font-bold`;

const FooterLinksList = tw.ul`flex flex-col gap-1 text-sm text-gray-700`;

const FooterLogoContainer = tw.div`mx-auto max-w-screen-2xl flex gap-2 items-center py-2 px-6`;

const FooterLogoIcon = tw.img`w-6 h-6 bg-white rounded-full`;

const FooterLogoHeader = tw.h3`text-sm text-charcoal tracking-tighter`;

const FooterPolicyLinksWrapper = tw.section`border-t-1.5 px-4 py-7`;

const FooterPolicyLinksList = tw.ul`
  mx-auto max-w-screen-2xl px-4 flex justify-center flex-wrap gap-4 md:gap-10 text-sm text-gray-700`;

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
