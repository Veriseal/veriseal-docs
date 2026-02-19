// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VeriSeal Docs',
  tagline: 'Global Cryptographic Integrity Infrastructure',
  favicon: 'img/favicon.ico',

  url: 'https://veriseal.app',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  organizationName: 'veriseal',
  projectName: 'veriseal-docs',

  // ============================================
  // i18n - 24 LANGUES UE
  // ============================================
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'fr', 'ro',
      'de', 'es', 'it', 'pt', 'nl', 'pl',
      'bg', 'cs', 'da', 'el', 'et', 'fi',
      'ga', 'hr', 'hu', 'lt', 'lv', 'mt',
      'sk', 'sl', 'sv'
    ],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    ({
      // ============================================
      // COLOR MODE - DARK FORCÉ
      // ============================================
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,  // PAS DE TOGGLE
        respectPrefersColorScheme: false,
      },

      // ============================================
      // NAVBAR - SANS LOGO
      // ============================================
      navbar: {
        title: 'VeriSeal',
        // PAS DE LOGO ICI (sera dans le hero)
        logo: undefined,
        
        items: [
          {
            to: '/docs/whitepaper/core-thesis',
            label: 'Infrastructure',
            position: 'left',
          },
          {
            to: '/docs/sectors/banking-financial-infrastructure',
            label: 'Sectors',
            position: 'left',
          },
          {
            to: '/docs/standard/vip-framework-001',
            label: 'Standard',
            position: 'left',
          },
          {
            to: '/docs/regulatory/regulatory-framework-overview',
            label: 'Regulatory',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },

      // ============================================
      // FOOTER
      // ============================================
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Infrastructure',
            items: [
              {
                label: 'Core Thesis',
                to: '/docs/whitepaper/core-thesis',
              },
              {
                label: 'Cryptographic Model',
                to: '/docs/technical/cryptography',
              },
            ],
          },
          {
            title: 'Deployment',
            items: [
              {
                label: 'Adoption Framework',
                to: '/docs/strategy/executive-adoption-framework',
              },
              {
                label: 'Sector Applications',
                to: '/docs/sectors/banking-financial-infrastructure',
              },
            ],
          },
          {
            title: 'Standard Framework',
            items: [
              {
                label: 'VIP Framework 001',
                to: '/docs/standard/vip-framework-001',
              },
              {
                label: 'VIP Suite 000',
                to: '/docs/standard/vip-suite-000',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} VeriSeal`,
      },
    }),
};

module.exports = config;
