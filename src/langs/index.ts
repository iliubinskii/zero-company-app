import { init } from "i18next";

/**
 * Initializes the i18next library with the default language and resources.
 */
export function initLangs() {
  init({
    lng: "en",
    resources: {
      en: {
        translation: {
          CreateCompany: "Create a company",
          LearnMore: "Learn More",
          LogIn: "Log In",
          ZeroCompany: "Zero Company",
          appDescription:
            "Create a virtual company at zero cost and grow it into your first unicorn!",
          appTitle: "Zero Company",
          homeCard1Description: `
              Drop in a legal foundation into your project at a very early
              stage.
            `,
          homeCard1Title: "Create a virtual company",
          homeCard2Description: `
              With our legally backed process, you can attract contributors
              for a share in your company.
            `,
          homeCard2Title: "Receive work contributions",
          homeCard3Description: `
              We design a seamless process of asset transfer to the company,
              where you can manage them collectively with your team.
            `,
          homeCard3Title: "Secure company assets",
          homeTeaser: "We elevate crowdworking to the corporate level",
          searchPlaceholder: "Search..."
        }
      }
    }
  });
}
