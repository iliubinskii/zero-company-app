/**
 * Initializes the i18next library with the default language and resources.
 */
export const lang = {
  CreateCompany: "Create a company",
  LearnMore: "Learn More",
  Loading: "Loading...",
  LogIn: "Log In",
  Profile: "Profile",
  ZeroCompany: "Zero Company",
  app: {
    description:
      "Create a virtual company at zero cost and grow it into your first unicorn!",
    title: "Zero Company"
  },
  header: { searchPlaceholder: "Search..." },
  home: {
    card1: {
      description: `
              Drop in a legal foundation into your project at a very early
              stage.
            `,
      title: "Create a virtual company"
    },
    card2: {
      description: `
              With our legally backed process, you can attract contributors
              for a share in your company.
            `,
      title: "Receive work contributions"
    },
    card3: {
      description: `
              We design a seamless process of asset transfer to the company,
              where you can manage them collectively with your team.
            `,
      title: "Secure company assets"
    },
    teaser: "We elevate crowdworking to the corporate level"
  }
} as const;
