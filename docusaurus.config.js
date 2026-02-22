// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VeriSeal Docs',
  tagline: 'Global Cryptographic Integrity Infrastructure',
  favicon: 'img/favicon.ico',
  url: 'https://docs.veriseal.app',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  organizationName: 'veriseal',
  projectName: 'veriseal-docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'it', 'es', 'ro', 'nl'],
    localeConfigs: {
      en: { label: 'EN · English' },
      fr: { label: 'FR · Français' },
      de: { label: 'DE · Deutsch' },
      it: { label: 'IT · Italiano' },
      es: { label: 'ES · Español' },
      ro: { label: 'RO · Română' },
      nl: { label: 'NL · Nederlands' },
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
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
      items: [
        { to: '/docs/whitepaper/core-thesis', label: 'Infrastructure' },
        { to: '/docs/sectors/banking-financial-infrastructure', label: 'Sectors' },
        { to: '/docs/standard/vip-framework-001', label: 'Standard' },
        { to: '/docs/regulatory/regulatory-framework-overview', label: 'Regulatory' },
        { type: 'localeDropdown', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: '© 2026 VeriSeal · contact@veriseal.app',
    },
  },
};
module.exports = config;