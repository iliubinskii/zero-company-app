import { ERROR } from "../consts";
import type { ExistingCompany } from "../schema";
import { images } from "../images";
import { lang } from "../langs";
import { logger } from "../services";

/**
 * Get the company image or a default image if the company has no image.
 * @param company - The company.
 * @param index - The index of the image.
 * @returns The company image or a default image.
 */
export function getCompanyImage(
  company: ExistingCompany,
  index = 0
): SafeImage {
  const image = company.images[index];

  if (image) return image;

  logger.error(ERROR.COMPANY_HAS_NO_IMAGE, company._id);

  const { height, src: secureUrl, width } = images.noImage;

  return { height, name: lang.Image, secureUrl, width };
}

/**
 * Get the company logo or a default logo if the company has no logo.
 * @param company - The company.
 * @returns The company logo or a default logo.
 */
export function getCompanyLogo(company: ExistingCompany): SafeImage {
  if (company.logo) return company.logo;

  logger.error(ERROR.COMPANY_HAS_NO_LOGO, company._id);

  const { height, src: secureUrl, width } = images.noLogo;

  return { height, name: lang.Logo, secureUrl, width };
}

export interface SafeImage {
  readonly height: number;
  readonly name: string;
  readonly secureUrl: string;
  readonly width: number;
}
