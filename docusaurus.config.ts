import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MemX',
  tagline: 'Documentation hub for the MemX project family.',
  favicon: 'img/memx-logo.svg',
  url: 'https://memx-lab.github.io',
  baseUrl: '/docs/',

  organizationName: 'MemX',
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
      title: 'MemX',
      hideOnScroll: false,
      logo: {
        alt: 'MemX',
        src: 'img/memx-logo.svg',
        href: 'https://memx-lab.github.io/',
      },
      items: [
        {to: '/', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/memx-lab',
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
            {label: 'RamRyder', to: '/memx-ramryder/overview'},
            {label: 'RAMOS', to: '/memx-ramos/overview'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/memx-lab'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MemX Lab`,
    },
    prism: {
      additionalLanguages: ['bash', 'toml', 'rust'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
