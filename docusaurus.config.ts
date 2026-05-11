import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const docsearchAppId = process.env.DOCSEARCH_APP_ID;
const docsearchApiKey = process.env.DOCSEARCH_API_KEY;
const docsearchIndexName = process.env.DOCSEARCH_INDEX_NAME;
const hasDocsearchConfig =
  Boolean(docsearchAppId) &&
  Boolean(docsearchApiKey) &&
  Boolean(docsearchIndexName);

const config: Config = {
  title: 'Analitex',
  tagline: 'Документы и инструкции по сервису оцифровки продаж на маркетплейсах',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.analitex.ru',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'analitex', // Usually your GitHub org/user name.
  projectName: 'analitex-docs-site', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {
        label: 'Русский',
        htmlLang: 'ru-RU',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/analitex/analitex-docs/tree/production/',
        },
        blog: false,
        sitemap: {
          filename: 'sitemap.xml',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/search/**', '/404.html'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'https://docs.analitex.ru/img/og-docs.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Официальная документация Analitex: инструкции, правила и справочные материалы по сервису оцифровки продаж на маркетплейсах.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: 'ru_RU',
      },
      {
        property: 'og:site_name',
        content: 'Analitex Docs',
      },
      {
        property: 'og:title',
        content: 'Analitex Documentation',
      },
      {
        property: 'og:description',
        content:
          'Официальная документация Analitex: инструкции, правила и справочные материалы по сервису оцифровки продаж на маркетплейсах.',
      },
      {
        property: 'og:image',
        content: 'https://docs.analitex.ru/img/og-docs.svg',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Analitex Documentation',
      },
      {
        name: 'twitter:description',
        content:
          'Официальная документация Analitex: инструкции, правила и справочные материалы по сервису оцифровки продаж на маркетплейсах.',
      },
      {
        name: 'twitter:image',
        content: 'https://docs.analitex.ru/img/og-docs.svg',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    ...(hasDocsearchConfig
      ? {
          algolia: {
            appId: docsearchAppId!,
            apiKey: docsearchApiKey!,
            indexName: docsearchIndexName!,
            contextualSearch: true,
            searchPagePath: 'search',
          },
        }
      : {}),
    navbar: {
      title: 'Analitex',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Документация',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://app.analitex.ru',
          label: 'Войти',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
