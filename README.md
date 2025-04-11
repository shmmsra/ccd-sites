# CCD Sites
A sample project to try out AEM Sites.

## Environments
- Preview: https://main--ccd-sites--shmmsra.aem.page/ e.g., https://main--ccd-sites--shmmsra.aem.page/shmishra/explore-ai-features
- Live: https://main--ccd-sites--shmmsra.aem.live/

## Documentation

Sample URL formats:
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

Before using the aem-boilerplate, we recommend you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mount point in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

## Update-Preview API samples (if not using AEM Sidekick)
NOTE: Access token can be extracted using Charles or DevTools!
Admin API details can be found here - https://www.aem.live/docs/admin.html
```
curl \
    -H "x-auth-token: <<AEM_SIDEKICK_TOKEN>>" \
    --data-binary "" \
    --compressed "https://admin.hlx.page/preview/shmmsra/ccd-sites/main/shmishra/shared-apis.json"
```
```
curl \
    -H "x-auth-token: <<AEM_SIDEKICK_TOKEN>>" \
    --data-binary "" \
    --compressed "https://admin.hlx.page/preview/shmmsra/ccd-sites/main/shmishra/explore-ai-features"
```

## References
### AEM Sites references:
  * https://www.aem.live/docs
  * https://www.aem.live/docs/architecture
  * https://www.aem.live/docs/authoring
  * https://www.aem.live/docs/admin.html
  * https://www.aem.live/developer/tutorial
  * https://www.aem.live/developer/indexing
  * https://www.aem.live/developer/spreadsheets
  * https://www.aem.live/developer/anatomy-of-a-project
  * https://www.aem.live/tools/bot/setup
### AEM Cloud Manager references:
  * https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/edge-delivery-sites/introduction-to-edge-delivery-services
  * https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/sites/sites-and-edge
  * https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/using-cloud-manager/managing-code/private-repositories
### AEM SideKick references:
  * https://sidekick-library--aem-block-collection--adobe.aem.page/tools/sidekick/library.html
  * https://sidekick-library--aem-block-collection--adobe.aem.page/block-collection/fragment-include
### Github references:
  * https://github.com/adobe/helix-home
  * https://github.com/adobe/aem-boilerplate
  * https://github.com/adobe/aem-block-collection
  * https://github.com/adobecom/milo
  * https://github.com/adobecom/milo-college
