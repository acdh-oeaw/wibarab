# WIBARAB Website

This is the website for the project "What is bedouin-type Arabic?" (WIBARAB), deployed at
<https://wibarab.acdh.oeaw.ac.at>.

## Adding and editing content

The primary way to add and edit website content is via the CMS at
<https://wibarab.acdh.oeaw.ac.at/admin>.

If you prefer to edit files directly in your text editor, you can:

- Add and edit blog articles in the `src/pages/blog/` folder. Content is written in MDX format,
  which is markdown with support for custom JavaScript components. Most markdown syntax is allowed,
  however there are
  [subtle parsing differences](https://github.com/micromark/mdx-state-machine#72-deviations-from-markdown)
  to be aware of. Also, don't forget to add required blog article metadata in the YAML header.
- Team member data lives as JSON files in `src/components/team/data`.

Any changes pushed to the `main` branch on the GitHub repo will automatically trigger a rebuild and
redeploy.

## Configuring the CMS

You can find the main CMS configuration at `src/lib/cms/cms.config.ts`, and new collections should
be added to the `src/lib/cms/collections` folder.

The CMS is headless, i.e. only concerned with storing content in the Git repository, and providing a
browser UI for content editing, not with rendering the site.

## Adjusting styles and layout

If you only want to adjust colors, you can edit the CSS custom properties in
`src/styles/colors.css`.

For anything else, you'll need some JavaScript knowledge. The website is built with Next.js, a
React-based metaframework, and follows framework conventions.

### Build locally

To build the site locally, you will need a recent [`Node.js`](https://nodejs.org) version (>=14.17)
as well as the [`yarn`](https://classic.yarnpkg.com/en/docs/install) package manager installed.

#### Install dependencies

```bash
yarn
```

#### Run development build

```bash
yarn dev
```

Alternatively, you can run a development build with Docker:

```bash
yarn docker:dev
```

#### Run production build

```bash
yarn build && yarn start
```

If you want to check changes to the CMS configuration, it is helpful to also run a local CMS server,
which does not communicate with the upstream Git repository, but saves content directly to the local
file system.

```bash
yarn cms:server
```
