import type { FC } from "react";
import React from "react";

export const InfoBlock: FC<Props> = ({
  additional_information,
  alt,
  block_header,
  block_text,
  button_text,
  company_name,
  img_url,
  link,
  subheader
}) => (
  <article className="flex flex-col md:flex-row gap-6 w-full mx-auto max-w-screen-2xl">
    <div className="w-full md:w-1/2">
      <img
        alt={alt}
        className="min-h-44 md:w-full md:h-full object-cover"
        src={img_url}
      />
    </div>
    <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
      <div className="flex flex-col gap-3 pl-5 border-l-[6px] border-green-primary/80">
        <a href={link}>
          <h2 className="text-xl lg:text-2xl hover:underline hover:text-green-primary underline-offset-4">
            {block_header}
          </h2>
        </a>
        {subheader && (
          <p className="text-xl">
            {subheader}{" "}
            <span className="text-xl lg:text-2xl">{company_name}</span>
          </p>
        )}
        <a href="/">
          <p className="text-base lg:text-lg">{block_text}</p>
        </a>
      </div>
      {additional_information ? (
        <div className="flex justify-between items-center gap-8 pt-4">
          <button
            className="text-xl text-green-secondary hover:underline underline-offset-4"
            type="button"
          >
            Join
          </button>
          <p className="w-2/3 text-sm">
            Applications for this month close on June 15
          </p>
        </div>
      ) : (
        <button
          className="text-l text-green-secondary hover:underline underline-offset-4"
          type="button"
        >
          {button_text}
        </button>
      )}
    </div>
  </article>
);

export interface Props {
  readonly additional_information?: string;
  readonly alt: string;
  readonly block_header: string;
  readonly block_text: string;
  readonly button_text: string;
  readonly company_name?: string;
  readonly img_url: string;
  readonly link: string;
  readonly subheader?: string;
}
