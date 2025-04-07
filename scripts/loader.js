// Function to fetch and inject AEM fragment content
async function loadAEMFragment(url) {
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
    document.body.innerHTML = "";
    document.body.appendChild(main);

    // Inject styles.css
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/styles/styles.css";
    document.head.appendChild(styleLink);

    // Inject scripts.js
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/scripts/scripts.js";
    document.head.appendChild(script);

    console.log("Fragment loaded and injected successfully");
  } catch (error) {
    console.error("Error loading fragment:", error);
  }
}

// Export the function for use in other modules
export { loadAEMFragment };

// Note: Due to CORS restrictions, you'll need one of these solutions:
// 1. Set up a proxy server to forward the requests
// 2. Configure CORS headers on the AEM server
// 3. Use a server-side solution to fetch the content
// 4. Use a browser extension to disable CORS (for development only)

// Example usage with a proxy URL (you'll need to set this up):
loadAEMFragment(
  "https://main--ccd-sites--shmmsra.aem.page/shmishra/explore-ai-features.plain.html"
);
