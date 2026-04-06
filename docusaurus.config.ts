import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'memx-lab docs',
  tagline: 'Documentation hub for the memx-lab project family.',
  url: 'https://memx-lab.github.io',
  baseUrl: '/docs/',

  organizationName: 'memx-lab',
  projectName: 'memx-docs',
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
          routeBasePath: 'docs',
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
      title: 'memx-lab docs',
      items: [
        {to: '/docs/overview', label: 'Docs', position: 'left'},
        {to: '/docs/projects', label: 'Projects', position: 'left'},
        {to: '/docs/roadmap', label: 'Roadmap', position: 'left'},
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
            {label: 'Overview', to: '/docs/overview'},
            {label: 'Getting Started', to: '/docs/getting-started'},
          ],
        },
        {
          title: 'Projects',
          items: [
            {label: 'Project Index', to: '/docs/projects'},
            {label: 'Architecture', to: '/docs/architecture'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub Organization', href: 'https://github.com/memx-lab'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} memx-lab`,
    },
    prism: {
      additionalLanguages: ['bash', 'toml', 'rust'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
