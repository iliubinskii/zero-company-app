import {
  BigCompanyCard,
  CompanyCard,
  CompanyCards,
  InternshipCard
} from "../components";
import { CompanyStatus } from "../schema";
import { MOCK_STATS } from "../consts";
import type { NextPage } from "next";
import { PageLayout } from "../layouts";
import React from "react";
import { api } from "../api";
import { images } from "../images";
import { lang } from "../langs";

const Page: NextPage = async () => {
  const companies = await api.getCompaniesSrv({
    limit: 3,
    sortBy: "foundedAt",
    sortOrder: "desc",
    status: CompanyStatus.founded
  });

  const featuredCompany = companies.docs[0];

  return (
    <PageLayout size="xl">
      {/* Teaser */}
      <div className="text-3xl text-gray-900 text-center">
        {lang.app.home.teaser}
      </div>
      {/* Teaser END */}

      {/* Stats */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-center text-gray-500 uppercase">
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
              <p className="text-gray-500 tracking-wider">{el.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Stats END */}

      {/* Text block */}
      <p className="px-10 w-4/5 mx-auto text-center text-gray-600">
        The startup world is a vibrant community of talented people where
        thousands of cutting-edge technologies are being born, and where
        everyone has unique skills and expertise. We created this platform to
        help connect the talents by providing a solid legal foundation and
        business models specifically tuned for early-stage startups
      </p>
      {/* Text block END*/}

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
        <div className="w-2/5 flex flex-col gap-4 justify-between">
          {mockArrayForInternshipCards
            .slice(0, tempNumberOfRenderInternshipCards)
            .map(el => (
              <InternshipCard key={el._id} {...el} />
            ))}
          <div className="">
            <button
              className="min-w-1/3 py-1 px-3 border rounded-xl text-lg bg-light-gray-cold hover:bg-charcoal/80 hover:text-white transition-colors duration-150"
              type="button"
            >
              More
            </button>
          </div>
        </div>
        {/* Internships END */}
      </div>
      {/* Two cols END */}

      {/* Compete Block */}
      <article className="flex gap-6 w-full">
        <div className="w-1/3">
          <img
            alt={"company name"}
            className="h-full object-cover"
            src={images.wide.sequoiaCapital.src}
          />
        </div>
        <div className="w-2/3 flex flex-col gap-3 items-start">
          <h2 className="text-2xl font-bold tracking-wider">
            Compete for $10K angel investment
          </h2>
          <p className="text-xl">
            Sponsored by{" "}
            <span className="text-2xl font-bold">Sequoia Capital</span>
          </p>
          <p>
            Each month, one team selected by the expert board will receive an
            angel investment from a leading venture capital fund, Sequoia
            Capital. The other three teams will be eligible for a free
            consultation with Sequoia Capital business development experts.
          </p>
          <div className="flex justify-between items-center gap-8 pt-4">
            <button
              className="text-xl text-green-primary hover:text-green-secondary transition-colors duration-150"
              type="button"
            >
              Join
            </button>
            <p className="w-2/3 text-sm">
              Applications for this month close on June 15
            </p>
          </div>
        </div>
      </article>
      {/* Compete Block End */}

      {/* Join as a co-founder Block */}
      <section>
        <h2 className="text-2xl font-bold tracking-wider mb-4">
          Join as a co-founder
        </h2>
        <CompanyCards>
          {companies.docs.map(company => (
            <CompanyCard company={company} key={company._id} />
          ))}
        </CompanyCards>
      </section>
      {/* Join as a co-founder Block END */}

      {/* Knowledge base block */}
      <section>
        <h2 className="text-2xl font-bold tracking-wider mb-4">
          Knowledgebase
        </h2>
        <div className="flex flex-col gap-10">
          <article className="flex gap-6 w-full">
            <div className="w-1/4">
              <img
                alt={"company name"}
                className="h-full object-cover"
                src={images.wide.businessManagement.src}
              />
            </div>
            <div className="w-3/4 flex flex-col gap-3 items-start">
              <h2 className="text-2xl font-bold tracking-wider">
                What is business process
              </h2>
              <p>
                A business process is a series of structured activities targeted
                at making decisions, resolving conflicts and standstills between
                stakeholders, securely sharing sensitive information, finding
                personnel, et cetera. Establishing business processes is crucial
                for successful business development at any stage.
              </p>
              <div className="flex justify-between items-center gap-8 pt-4">
                <button
                  className="text-xl text-green-primary hover:text-green-secondary transition-colors duration-150"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </div>
          </article>
          <article className="flex gap-6 w-full">
            <div className="w-3/4 flex flex-col gap-3 items-start">
              <h2 className="text-2xl font-bold tracking-wider">
                Is a Digital Document Legally Binding
              </h2>
              <p>
                Zero Company uses a trusted digital signature service provider
                that complies with the eIDAS Regulation in the EU, and the ESIGN
                Act and UETA in the US, to create legally binding agreements
                between our users.
              </p>
              <div className="flex justify-between items-center gap-8 pt-4">
                <button
                  className="text-xl text-green-primary hover:text-green-secondary transition-colors duration-150"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </div>
            <div className="w-1/4">
              <img
                alt={"company name"}
                className="h-full object-cover"
                src={images.wide.digitalSignature.src}
              />
            </div>
          </article>
        </div>
      </section>
      {/* Knowledge base block END */}
    </PageLayout>
  );
};

export default Page;

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
    // eslint-disable-next-line spellcheck/spell-checker -- Assigned
    city: "Tel Aviv",
    companyName: "Company Name",
    days: "4d",
    position: "Web Developer"
  },
  {
    _id: "2",
    // eslint-disable-next-line spellcheck/spell-checker -- Assigned
    city: "Netania",
    companyName: "Company Name2",
    days: "4d",
    position: "Project Manager"
  },
  {
    _id: "3",
    city: "Haifa",
    companyName: "Company Name3",
    days: "5d",
    position: "Java Developer"
  },
  {
    _id: "4",
    // eslint-disable-next-line spellcheck/spell-checker -- Assigned
    city: "Raanana",
    companyName: "Company Name4",
    days: "7d",
    // eslint-disable-next-line spellcheck/spell-checker -- Assigned
    position: "Devops"
  }
];

const tempNumberOfRenderInternshipCards = 3;
