/**
 * Initializes the i18next library with the default language and resources.
 */
export const lang = {
  About: "About",
  AboutUs: "About Us",
  AccessibilityStatement: "Accessibility Statement",
  ApiUrl: "API URL",
  Blog: "Blog",
  Bookmarks: "Bookmarks",
  BuySellAgreement: "Buy-Sell Agreement",
  CommonQuestions: "Common Questions",
  CompanyImages: "Add company images",
  CompanyLogo: "Add company logo",
  Continue: "Continue",
  CookiePolicy: "Cookie Policy",
  CreateCompany: "Create a company",
  Dashboard: "Dashboard",
  Description: "Description",
  Documents: "Documents",
  DragAlongRights: "Drag-Along Rights",
  Email: "E-mail",
  Explore: "Explore",
  FirstName: "First name",
  Founders: "Founders",
  HelpCenter: "Help Center",
  HowZeroCompanyWorks: "How Zero Company Works",
  IpAgreement: "IP Agreement",
  Jobs: "Jobs",
  LastName: "Last name",
  LearnMore: "Learn more",
  Legal: "Legal",
  LoadMore: "Load more",
  Loading: "Loading...",
  LogIn: "Log In",
  LogOut: "Log Out",
  MyCompanies: "My Companies",
  MyDrafts: "My Drafts",
  NDA: "NDA",
  Name: "Name",
  NotFound: "Not Found",
  OurCharter: "Our Charter",
  PreemptiveRights: "Preemptive Rights",
  PrivacyPolicy: "Privacy Policy",
  PrivateCompany: "Private company",
  Profile: "Profile",
  ROFR: "ROFR",
  Resources: "Resources",
  SelectCategory: "Select a category",
  SelectCountry: "Select a country",
  Settings: "Settings",
  Share: "Share",
  ShareholdersAgreement: "Shareholders' Agreement",
  Submit: "Submit",
  SuccessStories: "Success Stories",
  TagAlongRights: "Tag-Along Rights",
  TargetValue: "Target value",
  Team: "Team",
  TermsOfUse: "Terms of Use",
  Unauthorized: "Log in to access this page!",
  Website: "Website",
  ZeroAppServer: "Zero app server, schema ver",
  ZeroCompany: "Zero Company",
  app: {
    description:
      "Create a virtual company at zero cost and grow it into your first unicorn!",
    title: "Zero Company"
  },
  countries: {
    il: "Israel",
    us: "United States"
  },
  dragAndDropPrompt: "Drag & drop files here, or click to select files",
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
