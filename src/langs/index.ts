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
          appDescription:
            "Create a virtual company at zero cost and grow it into your first unicorn!",
          appTitle: "Zero Company"
        }
      }
    }
  });
}
