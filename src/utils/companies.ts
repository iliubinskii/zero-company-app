import type { ExistingCompany, Founder } from "../schema";

/**
 * Calculate the draft progress of a company.
 * @param company The company to calculate the draft progress of.
 * @returns The draft progress of the company.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- Ok
export function draftProgress(company?: ExistingCompany): DraftProgress {
  if (company) {
    let basicCount = 0;

    let basicTotal = 0;

    let publicCount = 0;

    let publicTotal = 0;

    let teamCount = 0;

    let teamTotal = 0;

    for (const key of companyKeys)
      switch (key) {
        case "_id":
        case "foundingAgreement":
        case "privateCompany":
        case "recommended":
        case "status":
        case "website": {
          break;
        }

        case "categories": {
          basicCount += company.categories.length > 0 ? 1 : 0;
          basicTotal++;

          break;
        }

        case "country": {
          basicCount += company.country ? 1 : 0;
          basicTotal++;

          break;
        }

        case "createdAt": {
          break;
        }

        case "description": {
          publicCount +=
            typeof company.description === "string" &&
            company.description.length > 0
              ? 1
              : 0;
          publicTotal++;

          break;
        }

        case "foundedAt": {
          break;
        }

        case "founders": {
          for (const founder of company.founders) {
            teamCount += 1;
            teamCount +=
              typeof founder.name === "string" && founder.name.length > 0
                ? 1
                : 0;
            teamCount += typeof founder.share === "number" ? 1 : 0;
          }

          teamTotal +=
            Math.max(company.founders.length, 1) * founderKeys.length;

          break;
        }

        case "images": {
          publicCount += company.images.length > 0 ? 1 : 0;
          publicTotal++;

          break;
        }

        case "logo": {
          publicCount += company.logo ? 1 : 0;
          publicTotal++;

          break;
        }

        case "name": {
          basicCount +=
            typeof company.name === "string" && company.name.length > 0 ? 1 : 0;
          basicTotal++;

          break;
        }

        case "targetValue": {
          basicCount += typeof company.targetValue === "number" ? 1 : 0;
          basicTotal++;

          break;
        }
      }

    const totalCount = basicCount + publicCount + teamCount;

    const totalTotal = basicTotal + publicTotal + teamTotal;

    return {
      basicProgress: basicCount / basicTotal,
      publicProgress: publicCount / publicTotal,
      teamProgress: teamCount / teamTotal,
      totalProgress: totalCount / totalTotal
    };
  }

  return {
    basicProgress: 0,
    publicProgress: 0,
    teamProgress: 0,
    totalProgress: 0
  };
}

export interface DraftProgress {
  readonly basicProgress: number;
  readonly publicProgress: number;
  readonly teamProgress: number;
  readonly totalProgress: number;
}

const companyRecord: Record<keyof ExistingCompany, boolean> = {
  _id: true,
  categories: true,
  country: true,
  createdAt: true,
  description: true,
  foundedAt: true,
  founders: true,
  foundingAgreement: true,
  images: true,
  logo: true,
  name: true,
  privateCompany: true,
  recommended: true,
  status: true,
  targetValue: true,
  website: true
};

// eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
const companyKeys = Object.keys(
  companyRecord
) as readonly (keyof ExistingCompany)[];

const founderRecord: Record<keyof Founder, boolean> = {
  email: true,
  name: true,
  share: true
};

// eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
const founderKeys = Object.keys(founderRecord) as readonly (keyof Founder)[];
