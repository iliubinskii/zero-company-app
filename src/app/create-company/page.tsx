"use client";

import { AnimatedLink, PageLayout } from "../../components";
import { resetCompanyRegistration, useAppDispatch } from "../../store";
import FAQ from "../../components/FAQ";
import React from "react";
import { createPage } from "../../utils";
import { images } from "../../images";
const Page = createPage("/create-company", () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <PageLayout>
        <div className="py-24 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">
            Do you have a great idea for a startup?{" "}
          </h1>
          <h2 className="text-2xl font-semi mb-4">
            Start your journey to success now! Create your virtual company and
            gather a team of like-minded individuals.
          </h2>

          <AnimatedLink
            className="dark-button"
            href="/create-company/steps"
            onBeforeClick={() => {
              dispatch(resetCompanyRegistration());
            }}
          >
            Start now!
          </AnimatedLink>
        </div>
      </PageLayout>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center relative">
          <img
            alt="background image"
            className="w-full h-auto bg-slate-400"
            src={images.backImageCreateCompany.src}
          />
          <div
            className="absolute right-0 w-2/5 p-10 bg-opacity-75 text-white items-center
                        text-sm
                        sm:text-lg
                        md:text-2xl
                        lg:text-4xl
                        xl:text-5xl"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eius
            animi nemo eligendi fugit iure tempora dolorem cumque sint autem,
            ipsum nam. Ad, ipsum.
            <p className="text-blue-700">Learn more...</p>
          </div>
        </div>
        <div className="w-full">
          <FAQ />
        </div>

        <div className="w-full flex flex-col items-center relative">
          <img
            alt="background image"
            className="w-full h-auto bg-slate-400"
            src={images.backImageDigitalSign.src}
          />
          <div
            className="absolute right-6 top-6 w-1/3 p-4 bg-white bg-opacity-50 items-center
                        text-sm
                        sm:text-lg
                        md:text-2xl
                        lg:text-4xl
                        xl:text-5xl"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eius
            animi nemo eligendi fugit iure tempora dolorem cumque sint autem,
            ipsum nam. Ad, ipsum.
            <p className="text-blue-700">Learn more...</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center relative">
          <img
            alt="background image"
            className="w-full h-auto bg-slate-400"
            src={images.backImageInternship.src}
          />
          <div
            className="absolute left-6 top-6 w-1/3 p-4 bg-white bg-opacity-50 items-center
                        text-sm
                        sm:text-lg
                        md:text-2xl
                        lg:text-4xl
                        xl:text-5xl"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eius
            animi nemo eligendi fugit iure tempora dolorem cumque sint autem,
            ipsum nam. Ad, ipsum.
            <p className="text-blue-700">Learn more...</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center relative">
          <img
            alt="background image"
            className="w-full h-auto bg-slate-400"
            src={images.backImageInvest.src}
          />
          <div
            className="absolute w-full p-20 bg-white bg-opacity-50 items-center
                        text-bold
                        sm:text-lg
                        md:text-2xl
                        lg:text-4xl
                        xl:text-5xl"
          >
            On our platform, angel investors are actively looking for promising
            projects. Dont miss your chance to secure funding and take your
            venture to the next level. Register your company today and move
            forward with confidence!
            <p className="text-blue-700">Learn more...</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default Page;
