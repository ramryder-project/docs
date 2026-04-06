import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MemX',
  tagline: 'Documentation hub for the MemX project family.',
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
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/roadmap', label: 'Roadmap', position: 'left'},
        {
          href: 'https://github.com/memx-lab',
          label: 'GitHub',
          position: 'right',
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
            {label: 'Getting Started', to: '/getting-started'},
          ],
        },
        {
          title: 'Projects',
          items: [
            {label: 'Project Index', to: '/projects'},
            {label: 'Architecture', to: '/architecture'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub Organization', href: 'https://github.com/memx-lab'},
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
