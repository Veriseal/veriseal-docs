// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VeriSeal Docs',
  tagline: 'Global Cryptographic Integrity Infrastructure',
  favicon: 'img/favicon.ico',

  url: 'https://veriseal.app',
  baseUrl: '/',
  trailingSlash: true,

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  organizationName: 'veriseal',
  projectName: 'veriseal-docs',

  // ============================================
  // i18n
  // ============================================
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'it', 'es', 'ro', 'nl'],
    localeConfigs: {
      en: { label: 'English' },
      fr: { label: 'Français' },
      de: { label: 'Deutsch' },
      it: { label: 'Italiano' },
      es: { label: 'Español' },
      ro: { label: 'Română' },
      nl: { label: 'Nederlands' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),

          // 🔥 IMPORTANT
          // On met les docs à la racine
          routeBasePath: '/',
        },

        blog: false,

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'VeriSeal',
      logo: undefined,
      items: [
        {
          to: '/whitepaper/core-thesis',
          label: 'Infrastructure',
          position: 'left',
        },
        {
          to: '/sectors/banking-financial-infrastructure',
          label: 'Sectors',
          position: 'left',
        },
        {
          to: '/standard/vip-framework-001',
          label: 'Standard',
          position: 'left',
        },
        {
          to: '/regulatory/regulatory-framework-overview',
          label: 'Regulatory',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Infrastructure',
          items: [
            {
              label: 'Core Thesis',
              to: '/whitepaper/core-thesis',
            },
            {
              label: 'Cryptographic Model',
              to: '/technical/cryptography',
            },
          ],
        },
        {
          title: 'Deployment',
          items: [
            {
              label: 'Adoption Framework',
              to: '/strategy/executive-adoption-framework',
            },
            {
              label: 'Sector Applications',
              to: '/sectors/banking-financial-infrastructure',
            },
          ],
        },
        {
          title: 'Standard Framework',
          items: [
            {
              label: 'VIP Framework 001',
              to: '/standard/vip-framework-001',
            },
            {
              label: 'VIP Suite 000',
              to: '/standard/vip-suite-000',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VeriSeal`,
    },
  },
};

module.exports = config;