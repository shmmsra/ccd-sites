/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

/**
 * The decision engine for where to get Milo's libs from.
 */
export const [setLibs, getLibs] = (() => {
  let libs;
  return [
    (prodLibs, force = false) => {
      if (force) {
        libs = prodLibs;
        return libs;
      }
      const { hostname } = window.location;
      if (
        !hostname.includes("hlx.page") &&
        !hostname.includes("hlx.live") &&
        !hostname.includes("aem.page") &&
        !hostname.includes("aem.live") &&
        !hostname.includes("localhost")
      ) {
        libs = prodLibs;
        return libs;
      }
      const branch =
        new URLSearchParams(window.location.search).get("milolibs") || "main";
      if (branch === "local") {
        libs = "http://localhost:6456/libs";
        return libs;
      }
      const env = hostname.includes(".hlx.") ? "hlx" : "aem";
      if (branch.indexOf("--") > -1) {
        libs = `https://${branch}.${env}.live/libs`;
        return libs;
      }
      libs = `https://${branch}--milo--adobecom.${env}.live/libs`;
      return libs;
    },
    () => libs,
  ];
})();

// const miloLibs = setLibs("/");
const miloLibs = window.location.origin;

// Import utilities from utils.js
const {
  createTag,
  localizeLink,
  loadStyle,
  loadLink,
  loadScript,
  createIntersectionObserver,
} = await import(`${miloLibs}/utils/utils.js`);

// Export utilities
export {
  createTag,
  loadStyle,
  loadLink,
  loadScript,
  localizeLink,
  createIntersectionObserver,
};

const CONFIG = {
  contentRoot: "/",
  codeRoot: "/",
  miloLibs: window.location.origin
};

export function setConfig(config = {}) {
  window.hlx = window.hlx || {};
  window.hlx.config = { ...CONFIG, ...config };
  return window.hlx.config;
}

export function getConfig() {
  return window.hlx?.config || CONFIG;
}

export const scriptInit = async () => {
  const { loadArea, setConfig } = await import(
    `${miloLibs}/utils/utils.js`
  );

  setConfig({ ...CONFIG, miloLibs });
  (function loadStyles() {
    const paths = [`${miloLibs}/styles/styles.css`];
    paths.forEach((path) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", path);
      document.head.appendChild(link);
    });
  })();
  (async function loadPage() {
    await loadArea();
  })();
};
