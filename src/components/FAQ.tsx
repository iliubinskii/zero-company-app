"use client";

import type { FC } from "react";
import React, { useState } from "react";

export const FAQ: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const FAQs = [
    {
      answer:
        "Our platform provides a legal framework, a safe communication environment, and the opportunity to attract both interns and experienced developers.",
      question: "Why should I create a company on your platform?"
    },
    {
      answer:
        "You can post job openings and offer equity in the company or compensation for participation in the project.",
      question: "How can I attract participants to my company?"
    },
    {
      answer:
        "A virtual company is a legal entity created for remote team interaction, using the tools provided by the platform.",
      question: "What is a virtual company?"
    }
    // Add more questions and answers as needed
  ];

  return (
    <div className="left-0 ml-6 py-12">
      <h2 className="md:text-2xl xl:text-5xl font-bold text-left mb-8">
        Frequently Asked Questions
      </h2>
      <div className=" text-left mb-8 mx-auto">
        <ul className="list-none pl-0">
          {FAQs.map((faq, index) => (
            <li className="mb-4" key={index}>
              <div className="flex items-start">
                <img alt="Icon" className="w-6 h-6 mr-2 mt-1" src="/logo.png" />
                <div className="w-full">
                  <h3
                    className="md:text-2xl xl:text-4xl font-semibold cursor-pointer text-left"
                    onClick={() => {
                      toggleAnswer(index);
                    }}
                  >
                    {faq.question}
                  </h3>
                  {activeIndex === index && (
                    <p className="md:text-xl xl:text-3xl mt-2 text-gray-700 text-left">
                      {faq.answer}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
