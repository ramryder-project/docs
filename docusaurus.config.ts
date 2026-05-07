import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'RamRyder',
  tagline: 'Documentation hub for the RamRyder project family.',
  favicon: 'img/ramryder-logo.svg',
  url: 'https://ramryder-project.github.io',
  baseUrl: '/docs/',

  organizationName: 'RamRyder',
  projectName: 'docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'RamRyder',
      hideOnScroll: false,
      logo: {
        alt: 'RamRyder',
        src: 'img/ramryder-logo.svg',
        href: 'https://ramryder-project.github.io/',
      },
      items: [
        {to: '/', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/ramryder-project',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Overview', to: '/'},
            {label: 'Hardware Support', to: '/hardware-support/overview'},
          ],
        },
        {
          title: 'Projects',
          items: [
            {label: 'RamRyder', to: '/ramryder/overview'},
            {label: 'RAMOS', to: '/ramos/overview'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/ramryder-project'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RamRyder Project`,
    },
    prism: {
      additionalLanguages: ['bash', 'toml', 'rust'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
