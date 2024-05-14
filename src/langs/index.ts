/**
 * Initializes the i18next library with the default language and resources.
 */
export const lang = {
  About: "About",
  AboutUs: "About Us",
  AccessibilityStatement: "Accessibility Statement",
  Account: "Account",
  Blog: "Blog",
  Bookmarks: "Bookmarks",
  CommonQuestions: "Common Questions",
  CompanyImages: "Add company images",
  CompanyLogo: "Add company logo",
  CookiePolicy: "Cookie Policy",
  CreateCompany: "Create a company",
  Dashboard: "Dashboard",
  Description: "Description",
  Documents: "Documents",
  Email: "E-mail",
  FirstName: "First name",
  Founders: "Founders",
  HelpCenter: "Help Center",
  HowZeroCompanyWorks: "How Zero Company Works",
  Jobs: "Jobs",
  LastName: "Last name",
  LearnMore: "Learn more",
  LegalFoundation: "Legal Foundation",
  LoadMore: "Load more",
  Loading: "Loading...",
  LogIn: "Log In",
  LogOut: "Log Out",
  MyCompanies: "My Companies",
  Name: "Name",
  OurCharter: "Our Charter",
  PrivacyPolicy: "Privacy Policy",
  PrivateCompany: "Private company",
  Profile: "Profile",
  Resources: "Resources",
  SelectCategory: "Select a category",
  Share: "Share",
  Submit: "Submit",
  SuccessStories: "Success Stories",
  TargetValue: "Target value",
  Team: "Team",
  TermsOfUse: "Terms of Use",
  Unauthorized: "Log in to access this page!",
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
