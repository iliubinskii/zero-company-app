"use client";

import type { Company } from "../schema";
import type { FC } from "react";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";
import { logger } from "../services";

export const CompanyCard: FC<Props> = ({ company, ...props }) => {
  const image = company.images[0];

  if (image === undefined) logger.error(lang.CompanyHasNoImages, company);

  const src = image ? image.secureUrl : images.noImage.src;

  const { height, width } = image ?? images.noImage;

  return (
    <div {...props}>
      <img
        alt={company.name ?? undefined}
        className="w-full"
        height={height}
        src={src}
        width={width}
      />
      {company.name}
    </div>
  );
};

export interface Props {
  readonly className?: string | undefined;
  readonly company: Company;
}
