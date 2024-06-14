/**
 * Initializes the i18next library with the default language and resources.
 */
export const lang = {
  About: "About",
  AboutUs: "About Us",
  AccessibilityStatement: "Accessibility Statement",
  AddTeamMember: "Add team member",
  ApiUrl: "API URL",
  AppLoadingContextNotInitialized: "App loading context not initialized",
  Blog: "Blog",
  Bookmarks: "Bookmarks",
  BuySellAgreement: "Buy-Sell Agreement",
  Category: "Category",
  CoFounders: "Co-founders",
  CommonQuestions: "Common Questions",
  Company: "Company",
  CompanyImages: "Add company images",
  CompanyLogo: "Add company logo",
  Continue: "Continue",
  CookiePolicy: "Cookie Policy",
  Country: "Country",
  CreateDraft: "Create a draft",
  Dashboard: "Dashboard",
  Description: "Description",
  Documents: "Documents",
  DragAlongRights: "Drag-Along Rights",
  EditProjectDraft: "Edit project draft",
  Email: "E-mail",
  ErrorLoadingAuthUser: "Error loading authenticated user",
  ErrorLoadingData: "Error loading data",
  ErrorLoadingDocuments: "Error loading documents",
  ErrorLoadingDrafts: "Error loading drafts",
  ErrorLoadingFavoriteCompanies: "Error loading favorite companies",
  Explore: "Explore",
  FirstName: "First name",
  Founder: "Founder",
  Founders: "Founders",
  FoundingAgreement: "Founding Agreement",
  GeneratedFoundingAgreement: "Generated Founding Agreement",
  GoToHomepage: "Go to Homepage",
  HelpCenter: "Help Center",
  HowZeroCompanyWorks: "How Zero Company Works",
  Image: "Image",
  Internships: "Internships",
  IpAgreement: "IP Agreement",
  Jobs: "Jobs",
  LastName: "Last name",
  LearnMore: "Learn more",
  Legal: "Legal",
  LoadMore: "Load more",
  Loading: "Loading...",
  LogIn: "Log In",
  LogOut: "Log Out",
  LoginToCreateDraft: "Login to create a draft",
  Logo: "Logo",
  MakingThingsDone: "Making things done...",
  MyCompanies: "My Companies",
  MyDrafts: "My Drafts",
  NDA: "NDA",
  Name: "Name",
  Next: "Next",
  NoCategory: "No category",
  NotFound: "Not Found",
  NotSigned: "Not signed",
  OurCharter: "Our Charter",
  PageDoesNotExist: "The page you are looking for does not exist.",
  PreemptiveRights: "Preemptive Rights",
  PrivacyPolicy: "Privacy Policy",
  PrivateCompany: "Private company",
  Profile: "Profile",
  ROFR: "ROFR",
  Resources: "Resources",
  Save: "Save",
  SelectCategory: "Select a category",
  SelectCountry: "Select a country",
  Settings: "Settings",
  Share: "Share",
  Sign: "Sign",
  Signatory: "Signatory",
  Signed: "Signed",
  SnackbarContextNotInitialized: "Snackbar context not initialized",
  StartCompany: "Start a company",
  StartCompany2: ["Start", " a company"],
  Submit: "Submit",
  SuccessStories: "Success Stories",
  TagAlongRights: "Tag-Along Rights",
  TargetValue: "Target value",
  Team: "Team",
  Teams: "Teams",
  TermsOfUse: "Terms of Use",
  Unauthorized: "Log in to access this page!",
  Unknown: "Unknown",
  Website: "Website",
  WithZeroCompany: "With Zero Company",
  ZeroAppServer: "Zero app server, schema ver",
  ZeroCompany: "Zero Company",
  ZeroMember: "Zero member",
  app: {
    home: {
      card1: {
        description: `
          Drop in a legal foundation into your project at a very early stage.
        `,
        title: "Create a virtual company"
      },
      card2: {
        description: `
          With our legally backed process, you can attract contributors for a
          share in your company.
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
      teaser: "Empower Your Startup with Proven Corporate Strategies"
    },
    profile: {
      drafts: {
        draft: {
          Basics: {
            description: `
              Name your project, edit country and categories.
            `,
            title: "Basics"
          },
          Public: {
            description: `
              Make your company visible to other people, find co-founders,
              post internship positions.
            `,
            title: "Public profile"
          },
          Signing: {
            description: "Generate company founding agreement.",
            title: "Signing"
          },
          Team: {
            description: `
              Add people you are working with on this project.
            `,
            title: "Team"
          }
        }
      },
      settings: {
        EditProfile: {
          description: "Tell other users a bit about yourself",
          title: "Edit Profile"
        }
      }
    }
  },
  company: "company",
  components: {
    form: {
      FileInputElement: {
        dragAndDropPrompt: "Drag & drop files here, or click to select files"
      }
    }
  },
  countries: {
    il: "Israel",
    us: "United States"
  },
  dragAndDropPrompt: "Drag & drop files here, or click to select files",
  header: { searchPlaceholder: "Search..." },
  internshipPositions: "internship positions",
  layouts: {
    RootLayout: {
      SiteSearch: {
        searchPlaceholder: "Search..."
      }
    }
  },
  lookingForCoFounder: "looking for co-founder",
  meta: {
    description: `
      Create a virtual company at zero cost and grow it into your first unicorn!
    `,
    title: "Zero Company"
  },
  of: "of",
  projectDraft: "project draft",
  teamsJoined: "teams joined"
} as const;
