import(/* webpackMode: "eager" */ './blocks/aside/aside.js');
import(/* webpackMode: "eager" */ './blocks/aside/aside.css');
import(/* webpackMode: "eager" */ './blocks/cards/cards.js');
import(/* webpackMode: "eager" */ './blocks/cards/cards.css');
import(/* webpackMode: "eager" */ './blocks/columns/columns.js');
import(/* webpackMode: "eager" */ './blocks/columns/columns.css');
import(/* webpackMode: "eager" */ './blocks/header/header.js');
import(/* webpackMode: "eager" */ './blocks/header/header.css');
import(/* webpackMode: "eager" */ './blocks/hero/hero.js');
import(/* webpackMode: "eager" */ './blocks/hero/hero.css');
import(/* webpackMode: "eager" */ './blocks/fragment/fragment.js');
import(/* webpackMode: "eager" */ './blocks/fragment/fragment.css');
import(/* webpackMode: "eager" */ './blocks/footer/footer.js');
import(/* webpackMode: "eager" */ './blocks/footer/footer.css');
import(/* webpackMode: "eager" */ './blocks/marquee/marquee.js');
import(/* webpackMode: "eager" */ './blocks/marquee/marquee.css');
import(/* webpackMode: "eager" */ './blocks/media/media.js');
import(/* webpackMode: "eager" */ './blocks/media/media.css');
import(/* webpackMode: "eager" */ './blocks/mnemonic-list/mnemonic-list.js');
import(/* webpackMode: "eager" */ './blocks/mnemonic-list/mnemonic-list.css');
import(/* webpackMode: "eager" */ './blocks/section-metadata/section-metadata.css');
import(/* webpackMode: "eager" */ './blocks/section-metadata/section-metadata.js');
import(/* webpackMode: "eager" */ './blocks/section-metadata/sticky-section.js');
import(/* webpackMode: "eager" */ './blocks/text/link-farms.css');
import(/* webpackMode: "eager" */ './blocks/text/text.css');
import(/* webpackMode: "eager" */ './blocks/text/text.js');
import(/* webpackMode: "eager" */ './styles/rounded-corners.css');
import(/* webpackMode: "eager" */ './utils/utils.js');

import loadPage from "./scripts/scripts.js";
import "./styles/styles.css";

// Function to fetch and inject AEM fragment content
async function loadAEMFragment(url, parentEl) {
  try {
    // Fetch the plain HTML fragment with no-cors mode
    const response = await fetch(url, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });

    const html = await response.text();

    // Preprocess HTML to convert relative paths to absolute paths
    const baseUrl = new URL(url);
    const processedHtml = html.replace(
      /(href|src|srcset)="(\.\/[^"]*|\.\.\/[^"]*|[^"\/][^"]*)"/g,
      (match, attr, path) => {
        // Skip if the path is already absolute or is a data URI
        if (
          path.startsWith("http") ||
          path.startsWith("//") ||
          path.startsWith("data:")
        ) {
          return match;
        }

        // Handle srcset attribute specially as it can contain multiple URLs
        if (attr === "srcset") {
          return `srcset="${path
            .split(",")
            .map((url) => {
              const [urlPart, size] = url.trim().split(" ");
              if (
                urlPart.startsWith("http") ||
                urlPart.startsWith("//") ||
                urlPart.startsWith("data:")
              ) {
                return url;
              }
              return `${new URL(urlPart, baseUrl).href}${
                size ? ` ${size}` : ""
              }`;
            })
            .join(", ")}"`;
        }

        // Convert relative path to absolute URL
        return `${attr}="${new URL(path, baseUrl).href}"`;
      }
    );

    const parser = new DOMParser();
    const fragmentDoc = parser.parseFromString(processedHtml, "text/html");

    // Get the body content from the fragment
    const fragmentBody = fragmentDoc.body;

    // Create a main element and set its content
    const main = document.createElement("main");
    main.innerHTML = fragmentBody.innerHTML;

    // Clear the body and append the main element
    parentEl.appendChild(main);

    console.log("Fragment loaded and injected successfully");

    loadPage();
  } catch (error) {
    console.error("Error loading fragment:", error);
  }
}


function loadAEMFragments() {
  document.body.innerHTML = "";
  // loadAEMFragment(
  //   "https://main--ccd-sites--shmmsra.aem.page/shmishra/creators-first-blade.plain.html",
  //   document.body
  // );
  loadAEMFragment(
    "https://main--ccd-sites--shmmsra.aem.page/shmishra/explore-ai-features.plain.html",
    document.body
  );
}

loadAEMFragments();
