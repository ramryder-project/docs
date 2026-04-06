import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/overview',
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Hardware Support',
      items: [
        'hardware-support/overview',
        'hardware-support/dimm',
        'hardware-support/pmem',
        'hardware-support/cxl',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/architecture',
        'concepts/elastic-memory',
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/index',
        'projects/memx-core',
        'projects/memx-bench',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/index',
        'community/contributing',
      ],
    },
    'roadmap',
  ],
};

export default sidebars;
