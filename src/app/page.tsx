import {
  BigCompanyCard,
  BlogCard,
  CompanyCard,
  CompanyCards,
  InfoBlock,
  InternshipCard
} from "../components";
import { CompanyStatus } from "../schema";
import { MOCK_STATS } from "../consts";
import type { NextPage } from "next";
import React from "react";
import { api } from "../api";
import { images } from "../images";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

const Page: NextPage = async () => {
  const companies = await api.getCompaniesSrv({
    limit: 4,
    sortBy: "foundedAt",
    sortOrder: "desc",
    status: CompanyStatus.founded
  });

  const featuredCompany = companies.docs[0];

  return (
    <div className="w-full flex flex-col px-10 divide-y divide-gray-200">
      <section>
        <SectionContainerTop className="flex flex-col gap-20">
          <div className="flex flex-col gap-10">
            {/* Slogan */}
            <div className="text-teaser text-gray-700 text-center">
              {lang.app.home.teaser}
            </div>
            {/* Slogan END */}

            {/* Stats */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-center text-gray-500 text-sm uppercase">
                {lang.WithZeroCompany}:
              </div>
              <div className="flex justify-center items-center w-full bg-light-gray-warm/50">
                {mockArrayForInfoCells.map((el, index) => (
                  <div
                    className="w-full flex flex-col py-4 px-6 border gap-2 justify-center items-center"
                    key={index}
                  >
                    <p className="text-3xl text-green-secondary">
                      {el.number.toLocaleString()}
                    </p>
                    <p className="text-gray-500 tracking-wider">
                      {el.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Stats END */}
          </div>

          {/* Two cols */}
          <div className="flex gap-10">
            {/* Featured companies */}
            {featuredCompany && (
              <div className="w-3/5">
                <BigCompanyCard company={featuredCompany} />
              </div>
            )}
            {/* Featured companies END */}

            {/* Internships */}
            <div className="w-2/5 flex flex-col">
              <h2 className="text-sm text-gray-500 font-bold">
                Join as a co-worker
              </h2>
              {mockArrayForInternshipCards
                .slice(0, tempNumberOfRenderInternshipCards)
                .map(el => (
                  <InternshipCard key={el._id} {...el} />
                ))}
              <div className="pt-4">
                <button
                  className="text-xl text-green-secondary hover:underline underline-offset-4"
                  type="button"
                >
                  Show more
                </button>
              </div>
            </div>
            {/* Internships END */}
          </div>
          {/* Two cols END */}
        </SectionContainerTop>
      </section>

      {/* Compete Block */}
      {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,  sonarjs/no-redundant-boolean -- Ok
        false && (
          <section>
            <SectionContainer>
              <InfoBlock {...competeBlock} />
            </SectionContainer>
          </section>
        )
      }
      {/* Compete Block End */}

      {/* Knowledge base block */}
      <section>
        <SectionContainer>
          <InfoBlock {...businessProcessBlock} />
        </SectionContainer>
      </section>
      {/* Knowledge base block END */}

      {/* Join as a co-founder Block */}
      <section>
        <SectionContainer>
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="text-sm text-gray-500 font-bold mb-4">
              Join as a co-founder
            </h2>
            <CompanyCards>
              {
                // eslint-disable-next-line no-magic-numbers -- Temp
                companies.docs.slice(1, 4).map(company => (
                  <CompanyCard company={company} key={company._id} />
                ))
              }
            </CompanyCards>
          </div>
        </SectionContainer>
      </section>
      {/* Join as a co-founder Block END */}

      {/* Knowledge base block */}
      <section>
        <SectionContainer>
          <InfoBlock {...digitalDocumentBlock} />
        </SectionContainer>
      </section>
      {/* Knowledge base block END */}

      {/* Creator's corner block */}
      <section>
        <SectionContainer>
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="text-sm text-gray-500 font-bold mb-4">Our blog</h2>
            <div className="grid grid-cols-2 gap-16">
              {mockArrayBlogBlock.map(el => (
                <BlogCard key={el.id} {...el} />
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>
      {/* Knowledge base block END */}
    </div>
  );
};

export default Page;

const SectionContainerTop = tw.div`mx-auto w-full max-w-screen-xl pt-8 pb-20`;

const SectionContainer = tw.div`mx-auto w-full max-w-screen-xl pt-20 pb-24`;

/* eslint-disable spellcheck/spell-checker -- Ok */

const mockArrayForInfoCells = [
  {
    description: lang.teamsJoined,
    number: MOCK_STATS.TEAMS_JOINED
  },
  {
    description: lang.internshipPositions,
    number: MOCK_STATS.INTERNSHIP_POSITIONS
  },
  {
    description: lang.lookingForCoFounder,
    number: MOCK_STATS.LOOKING_FOR_COFOUNDER
  }
];

const mockArrayForInternshipCards = [
  {
    _id: "1",
    city: "Tel Aviv",
    companyName: "Company Name",
    country: "Israel",
    days: "4d",
    position: "Web Developer",
    src: "/vacancies/vacancy-1.webp"
  },
  {
    _id: "2",
    city: "Netania",
    companyName: "Company Name2",
    country: "Israel",
    days: "4d",
    position: "Project Manager",
    src: "/vacancies/vacancy-2.webp"
  },
  {
    _id: "3",
    city: "Haifa",
    companyName: "Company Name3",
    country: "Israel",
    days: "5d",
    position: "Java Developer",
    src: "/vacancies/vacancy-3.webp"
  },
  {
    _id: "4",
    city: "Raanana",
    companyName: "Company Name4",
    country: "Israel",
    days: "7d",
    position: "Devops",
    src: "/vacancies/vacancy-4.webp"
  },
  {
    _id: "5",
    city: "New York",
    companyName: "Company Name5",
    country: "USA",
    days: "7d",
    position: "Fullstack Engineer",
    src: "/vacancies/vacancy-5.webp"
  }
];

const tempNumberOfRenderInternshipCards = 4;

const businessProcessBlock = {
  alt: "business process in office",
  block_header: "What is business process",
  block_text:
    "A business process is a series of structured activities targeted\n" +
    "                at making decisions, resolving conflicts and standstills between\n" +
    "                stakeholders, securely sharing sensitive information, finding\n" +
    "                personnel, et cetera. Establishing business processes is crucial\n" +
    "                for successful business development at any stage.",
  button_text: "Read more",
  img_url: images.wide.businessProcess.src,
  link: "/"
};
const digitalDocumentBlock = {
  alt: "digital document signing",
  block_header: "Is a Digital Document Legally Binding",
  block_text:
    " Zero Company uses a trusted digital signature service provider\n" +
    "              that complies with the eIDAS Regulation in the EU, and the ESIGN\n" +
    "              Act and UETA in the US, to create legally binding agreements\n" +
    "              between our users.",
  button_text: "Read more",
  img_url: images.wide.digitalSignature2.src,
  link: "/"
};

const competeBlock = {
  additional_information: "Applications for this month close on June 15",
  alt: "sequoia company building",
  block_header: "Compete for $10K angel investment",
  block_text:
    "Each month, one team selected by the expert board will receive an\n" +
    "            angel investment from a leading venture capital fund, Sequoia\n" +
    "            Capital. The other three teams will be eligible for a free\n" +
    "            consultation with Sequoia Capital business development experts.",
  button_text: "Join",
  company_name: "Sequoia Capital",
  img_url: images.wide.sequoiaCapital2.src,
  link: "/",
  subheader: "Sponsored by "
};
const mockArrayBlogBlock = [
  {
    button_text: "Read more",
    header: "The Four Cringe-Worthy Mistakes Too Many Startups Make with Data",
    id: "1",
    img_url: images.blog.photo1.src,
    link: "/",
    text:
      "I’ve talked to people at pre-launch startups with fewer than\n" +
      "100 users who say, ‘We’re going to start on personalization, And I’m thinking, ‘What are you going to personalize?"
  },
  {
    button_text: "Read more",
    header: "How to Develop Content for Every Stage of the Customer Journey",
    id: "2",
    img_url: images.blog.photo2.src,
    link: "/",
    text:
      "Everyone wants to succeed at content marketing, but where do you start? " +
      "John Jantsch answers this question perfectly: with understanding your customer’s journey, " +
      "and mapping your content plan to it."
  },
  {
    button_text: "Read more",
    header: "How Shopify Increased Revenue 90% in 365 Days",
    id: "3",
    img_url: images.blog.photo3.src,
    link: "/",
    text:
      "Initially, I was surprised to see that Shopify is trying to sell their paid plans in the " +
      "very first onboarding email since they push their free trial all over their website. " +
      "But after some analysis, it makes sense."
  },
  {
    button_text: "Read more",
    header: "21 Customer Acquisition Strategies to Win New Customers",
    id: "4",
    img_url: images.blog.photo4.src,
    link: "/",
    text:
      "I’m going to give you a host of customer acquisition tactics, " +
      "as well as a way to test them out, in order to enable you to get a feel for which " +
      "channels have the potential to deliver the most value."
  }
];
