/**
 * Initializes the i18next library with the default language and resources.
 */
export const lang = {
  CompanyImages: "Add company images",
  CompanyLogo: "Add company logo",
  CreateCompany: "Create a company",
  Description: "Description",
  Email: "E-mail",
  FirstName: "First name",
  Founders: "Founders",
  LastName: "Last name",
  LearnMore: "Learn more",
  LoadMore: "Load more",
  Loading: "Loading...",
  LogIn: "Log In",
  LogOut: "Log Out",
  Name: "Name",
  PrivateCompany: "Private company",
  Profile: "Profile",
  SelectCategory: "Select a category",
  Share: "Share",
  Submit: "Submit",
  TargetValue: "Target value",
  Website: "Website",
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
