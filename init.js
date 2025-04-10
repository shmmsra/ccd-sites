import(/* webpackMode: "eager" */ './blocks/aside/aside.js');
import(/* webpackMode: "eager" */ './blocks/aside/aside.css');
import(/* webpackMode: "eager" */ './blocks/cards/cards.js');
import(/* webpackMode: "eager" */ './blocks/cards/cards.css');
import(/* webpackMode: "eager" */ './blocks/carousel/carousel.js');
import(/* webpackMode: "eager" */ './blocks/carousel/carousel.css');
import(/* webpackMode: "eager" */ './blocks/columns/columns.js');
import(/* webpackMode: "eager" */ './blocks/columns/columns.css');
import(/* webpackMode: "eager" */ './blocks/editorial-card/editorial-card.js');
import(/* webpackMode: "eager" */ './blocks/editorial-card/editorial-card.css');
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
import(/* webpackMode: "eager" */ './blocks/quote/quote.js');
import(/* webpackMode: "eager" */ './blocks/quote/quote.css');
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

import { LitElement, html, css } from 'lit';

class AEMSites extends LitElement {
  static properties = {
    path: { type: String },
  };

  constructor() {
    super();
    this.path = '';
  }

  async firstUpdated() {
    await this.loadAEMFragment(this.path);
  }

  async loadAEMFragment(url) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
      });

      const html = await response.text();
      const baseUrl = new URL(url);
      const processedHtml = html.replace(
        /(href|src|srcset)="(\.\/[^"\s]*|\.\.\/[^"\s]*|[^"\/][^"\s]*)"/g,
        (match, attr, path) => {
          if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) {
            return match;
          }
          if (attr === 'srcset') {
            return `srcset="${path
              .split(',')
              .map((url) => {
                const [urlPart, size] = url.trim().split(' ');
                if (urlPart.startsWith('http') || urlPart.startsWith('//') || urlPart.startsWith('data:')) {
                  return url;
                }
                return `${new URL(urlPart, baseUrl).href}${size ? ` ${size}` : ''}`;
              })
              .join(', ')}"`;
          }
          return `${attr}="${new URL(path, baseUrl).href}"`;
        }
      );

      const parser = new DOMParser();
      const fragmentDoc = parser.parseFromString(processedHtml, 'text/html');
      const fragmentBody = fragmentDoc.body;

      const main = document.createElement('main');
      main.innerHTML = fragmentBody.innerHTML;

      this.appendChild(main);

      console.log('Fragment loaded and injected successfully');

      loadPage(this);
    } catch (error) {
      console.error('Error loading fragment:', error);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get('aem-sites')) {
  customElements.define('aem-sites', AEMSites);
}
